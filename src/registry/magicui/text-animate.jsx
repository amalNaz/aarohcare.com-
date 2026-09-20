import React, { Children, isValidElement } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { cn } from '@/utils/cn'

const ANIMATION_VARIANTS = {
  slideUp: {
    container: (stagger, delay) => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    }),
    item: (duration) => ({
      hidden: { y: '100%', opacity: 0 },
      show: {
        y: '0%',
        opacity: 1,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }),
  },
  slideDown: {
    container: (stagger, delay) => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    }),
    item: (duration) => ({
      hidden: { y: '-100%', opacity: 0 },
      show: {
        y: '0%',
        opacity: 1,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }),
  },
  fadeIn: {
    container: (stagger, delay) => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    }),
    item: (duration) => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          duration,
          ease: 'easeOut',
        },
      },
    }),
  },
  blurIn: {
    container: (stagger, delay) => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    }),
    item: (duration) => ({
      hidden: { filter: 'blur(10px)', opacity: 0, y: 15 },
      show: {
        filter: 'blur(0px)',
        opacity: 1,
        y: 0,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }),
  },
  scaleUp: {
    container: (stagger, delay) => ({
      hidden: {},
      show: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    }),
    item: (duration) => ({
      hidden: { scale: 0.8, opacity: 0 },
      show: {
        scale: 1,
        opacity: 1,
        transition: {
          duration,
          ease: [0.22, 1, 0.36, 1],
        },
      },
    }),
  },
}

const MOTION_TAGS = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
  h4: motion.h4,
  h5: motion.h5,
  h6: motion.h6,
  p: motion.p,
  span: motion.span,
  div: motion.div,
}

export function TextAnimate({
  children,
  animation = 'slideUp',
  by = 'word',
  className,
  segmentClassName,
  as = 'span',
  delay = 0,
  duration = 0.55,
  stagger = 0.05,
  once = false,
  viewportMargin = '0px 0px -5% 0px',
  amount = 0.2,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion()
  if (shouldReduceMotion) {
    const Component = as || 'span'
    return <Component className={className} {...props}>{children}</Component>
  }

  const selectedAnimation = ANIMATION_VARIANTS[animation] || ANIMATION_VARIANTS.slideUp
  const containerVariants = selectedAnimation.container(stagger, delay)
  const itemVariants = selectedAnimation.item(duration)

  const MotionComponent = MOTION_TAGS[as] || motion.span

  // Helper to split text into words or characters while preserving spacing
  const renderTokens = (node, keyPrefix = '') => {
    if (typeof node === 'string') {
      if (by === 'character') {
        const chars = node.split('')
        return chars.map((char, i) => (
          <span key={`${keyPrefix}-c-${i}`} className="inline-block overflow-hidden align-top">
            <motion.span variants={itemVariants} className={cn('inline-block', segmentClassName)}>
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))
      }

      // Default: 'word'
      const words = node.split(/\s+/).filter(Boolean)
      return words.map((word, i) => (
        <React.Fragment key={`${keyPrefix}-w-${i}`}>
          <span className="inline-block overflow-hidden align-top">
            <motion.span variants={itemVariants} className={cn('inline-block', segmentClassName)}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && ' '}
        </React.Fragment>
      ))
    }

    if (isValidElement(node)) {
      if (node.type === 'br') {
        return <br key={`${keyPrefix}-br`} />
      }
      if (node.props && node.props.children) {
        return React.cloneElement(
          node,
          { key: keyPrefix },
          Children.map(node.props.children, (child, idx) => renderTokens(child, `${keyPrefix}-${idx}`))
        )
      }
      return node
    }

    return node
  }

  const content = Children.map(children, (child, idx) => renderTokens(child, `tok-${idx}`))

  return (
    <MotionComponent
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: viewportMargin, amount }}
      variants={containerVariants}
      className={className}
      {...props}
    >
      {content}
    </MotionComponent>
  )
}

export default TextAnimate

import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDown } from 'lucide-react'

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef(({ className = '', ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={`border-b border-dotted border-[#cfcfcf] py-4 sm:py-4.5 lg:py-5 ${className}`}
    {...props}
  />
))
AccordionItem.displayName = 'AccordionItem'

const AccordionTrigger = React.forwardRef(
  ({ className = '', children, showArrow = true, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={`flex flex-1 items-center justify-between gap-4 text-left font-medium text-[15px] sm:text-[16px] lg:text-[17px] text-[#092240] transition-colors group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#092240] rounded py-0.5 group-hover:text-blue-900 [&[data-state=open]>span>svg]:rotate-180 ${className}`}
        {...props}
      >
        <span className="leading-snug">{children}</span>
        {showArrow && (
          <span className="text-[#092240] shrink-0 w-5 h-5 flex items-center justify-center">
            <ChevronDown className="h-4 w-4 shrink-0 stroke-[2.2] transition-transform duration-300 ease-out" />
          </span>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
)
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef(
  ({ className = '', children, keepRendered = false, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-[13px] sm:text-[13.5px] lg:text-[14px] text-slate-600 font-normal leading-[1.65] transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      forceMount={keepRendered ? true : undefined}
      {...props}
    >
      <div className={`pt-2.5 pb-1 pr-3 max-w-2xl ${className}`}>{children}</div>
    </AccordionPrimitive.Content>
  )
)
AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }


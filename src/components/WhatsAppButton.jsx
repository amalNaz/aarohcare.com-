import React from 'react'

export default function WhatsAppButton({
  phoneNumber = '919072043356',
  message = 'Hi AarohCare, I would like to know more about your services.',
}) {
  const encodedMsg = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMsg}`

  return (
    <aside
      aria-label="Contact via WhatsApp"
      className="group fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 select-none [bottom:max(1rem,env(safe-area-inset-bottom))] sm:[bottom:max(1.5rem,env(safe-area-inset-bottom))] [right:max(1rem,env(safe-area-inset-right))] sm:[right:max(1.5rem,env(safe-area-inset-right))] before:absolute before:-top-4 before:-bottom-2 before:-left-2 before:-right-2 before:content-['']"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor-magnetic
        className="flex items-center gap-2 sm:gap-2.5 bg-[#18181b]/95 hover:bg-[#222226] text-white border border-neutral-700/80 hover:border-neutral-600 rounded-full pl-3.5 sm:pl-4.5 pr-1 sm:pr-1.5 py-1 sm:py-1.5 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.5),0_0_20px_rgba(37,211,102,0.25)] hover:shadow-[0_12px_35px_-5px_rgba(0,0,0,0.6),0_0_25px_rgba(37,211,102,0.45)] backdrop-blur-md transition-all duration-300 group-hover:animate-chat-jump active:scale-[0.98] cursor-pointer"
        aria-label="Chat with AarohCare on WhatsApp"
      >
        {/* Chat text with sparkle icon */}
        <span className="text-xs sm:text-sm font-semibold tracking-normal text-white flex items-center gap-1 sm:gap-1.5">
          <span>Chat</span>
          {/* Sparkle ✦ */}
          <span className="text-emerald-400 text-xs sm:text-sm transition-transform duration-300 group-hover:rotate-12 group-hover:scale-125">
            ✦
          </span>
        </span>

        {/* WhatsApp Green Circular Icon Badge */}
        <div className="w-7.5 h-7.5 sm:w-9 sm:h-9 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:animate-icon-wiggle">
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 sm:w-5 sm:h-5 text-white"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.17 8.17 0 012.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.46 0-2.89-.39-4.14-1.13l-.3-.18-3.08.81.82-3-.19-.31a8.15 8.15 0 01-1.25-4.43c0-4.54 3.7-8.24 8.24-8.24h-.09zm-3.56 4.3c-.2 0-.44.07-.67.33-.23.26-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.59.1.48-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.49-.3-.26-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.26-.67.81-.82.98-.15.17-.3.19-.56.06-.26-.13-1.1-.4-2.1-1.28-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.06-.13-.57-1.38-.78-1.89-.2-.5-.42-.43-.57-.44l-.49-.01z" />
          </svg>
        </div>
      </a>
    </aside>
  )
}

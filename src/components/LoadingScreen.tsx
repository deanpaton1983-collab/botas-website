'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 2200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{ backgroundColor: '#2D4F5C' }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: 'easeInOut' } }}
        >
          {/* Sonar rings animated */}
          <div className="relative flex items-center justify-center">
            {/* Expanding rings */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border"
                style={{ borderColor: '#7ECECE' }}
                initial={{ width: 40, height: 40, opacity: 0.7 }}
                animate={{
                  width: 300,
                  height: 300,
                  opacity: 0,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: 'easeOut',
                }}
              />
            ))}

            {/* Centre logo mark */}
            <motion.div
              className="relative z-10 flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* SVG sonar logo mark */}
              <svg width="80" height="80" viewBox="0 0 80 80" aria-hidden="true">
                <circle cx="40" cy="40" r="35" fill="none" stroke="#7ECECE" strokeWidth="1" opacity="0.4" />
                <circle cx="40" cy="40" r="24" fill="none" stroke="#7ECECE" strokeWidth="1" opacity="0.5" />
                <circle cx="40" cy="40" r="14" fill="none" stroke="#7ECECE" strokeWidth="1" opacity="0.6" />
                <circle cx="40" cy="40" r="5" fill="none" stroke="#7ECECE" strokeWidth="1" opacity="0.8" />
                <circle cx="40" cy="40" r="2" fill="#7ECECE" opacity="0.9" />
                {/* Sweep line */}
                <line x1="40" y1="40" x2="40" y2="6" stroke="#7ECECE" strokeWidth="1" opacity="0.5" />
                {/* Partial ring removed */}
                <path d="M 40 5 A 35 35 0 0 1 73 55" fill="none" stroke="#7ECECE" strokeWidth="2.5" opacity="0.9" />
              </svg>

              <motion.p
                className="font-montserrat font-black text-offwhite uppercase tracking-widest text-xs"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Battle of the Atlantic Story
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

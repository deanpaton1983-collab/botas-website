import Link from 'next/link'

/** Data attribution footer shown at the end of every Battle at Sea page. */
export default function AtlanticFooter() {
  return (
    <div
      className="relative py-10 text-center"
      style={{ backgroundColor: '#0d3040', borderTop: '1px solid rgba(126,206,206,0.15)' }}
    >
      <p
        className="font-mono text-xs px-6"
        style={{ color: 'rgba(248,244,238,0.55)', letterSpacing: '0.08em' }}
      >
        Vessel records, service histories and fates compiled from{' '}
        <a
          href="https://uboat.net"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
          style={{ color: '#7ECECE' }}
        >
          uboat.net
        </a>
        {' '}· Final positions parsed from recorded fates
      </p>
      <p
        className="font-mono text-xs mt-2 px-6"
        style={{ color: 'rgba(248,244,238,0.4)', letterSpacing: '0.08em' }}
      >
        <Link href="/atlantic" className="underline hover:text-teal-light">
          The Battle at Sea
        </Link>
        {' '}· Battle of the Atlantic Story
      </p>
    </div>
  )
}

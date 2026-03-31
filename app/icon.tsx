import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 22,
          background: '#0D1A0E',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#22C55E',
          borderRadius: '6px',
          fontWeight: 900,
          fontFamily: 'serif',
          border: '1px solid #16A34A',
        }}
      >
        M
      </div>
    ),
    // ImageResponse options
    {
      ...size,
    }
  );
}

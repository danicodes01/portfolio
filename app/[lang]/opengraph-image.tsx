import { ImageResponse } from 'next/og';

export const alt = 'Daniel Knowles — Software Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadGoogleFont(family: string, weight: number, text?: string) {
  const familyParam = family.replace(/\s+/g, '+');
  let url = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&display=swap`;
  if (text) url += `&text=${encodeURIComponent(text)}`;

  const css = await fetch(url, {
    headers: {
      // Older UA string so Google Fonts serves TTF instead of WOFF2 (Satori needs TTF/OTF).
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
    },
    cache: 'no-store',
  }).then(res => res.text());

  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)/);
  if (!match) throw new Error(`Could not resolve font file for ${family} ${weight}`);
  return fetch(match[1]).then(res => res.arrayBuffer());
}

export default async function Image() {
  const [firaCodeBold, interSemibold, interRegular] = await Promise.all([
    loadGoogleFont('Fira Code', 700, 'D'),
    loadGoogleFont('Inter', 600, 'Daniel Knowles'),
    loadGoogleFont('Inter', 400, 'Software Engineer'),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0b',
          backgroundImage:
            'radial-gradient(ellipse 900px 600px at 20% 15%, rgba(255, 56, 92, 0.22) 0%, rgba(255, 56, 92, 0) 60%), radial-gradient(ellipse 800px 500px at 85% 90%, rgba(132, 56, 151, 0.22) 0%, rgba(132, 56, 151, 0) 60%), linear-gradient(135deg, #0a0a0b 0%, #18181b 50%, #0a0a0b 100%)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              fontFamily: 'Fira Code',
              fontWeight: 700,
              fontSize: 420,
              lineHeight: 1,
              color: '#f7f7f7',
              letterSpacing: '-0.04em',
              textShadow: '0 0 60px rgba(255, 56, 92, 0.35)',
            }}
          >
            D
          </div>
          <div
            style={{
              width: 240,
              height: 14,
              borderRadius: 7,
              backgroundColor: '#FF385C',
              marginTop: 8,
              boxShadow: '0 0 40px rgba(255, 56, 92, 0.6)',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: 52,
            }}
          >
            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: 68,
                color: '#f7f7f7',
                letterSpacing: '-0.025em',
                lineHeight: 1,
              }}
            >
              Daniel Knowles
            </div>
            <div
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: 32,
                color: '#a1a1aa',
                marginTop: 16,
                letterSpacing: '0.02em',
              }}
            >
              Software Engineer
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fira Code', data: firaCodeBold, style: 'normal', weight: 700 },
        { name: 'Inter', data: interSemibold, style: 'normal', weight: 600 },
        { name: 'Inter', data: interRegular, style: 'normal', weight: 400 },
      ],
    },
  );
}

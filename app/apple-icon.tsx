import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

async function loadGoogleFont(family: string, weight: number, text?: string) {
  const familyParam = family.replace(/\s+/g, '+');
  let url = `https://fonts.googleapis.com/css2?family=${familyParam}:wght@${weight}&display=swap`;
  if (text) url += `&text=${encodeURIComponent(text)}`;

  const css = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
    },
    cache: 'no-store',
  }).then(res => res.text());

  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)/);
  if (!match) throw new Error(`Could not resolve font file for ${family} ${weight}`);
  return fetch(match[1]).then(res => res.arrayBuffer());
}

export default async function AppleIcon() {
  const firaCodeBold = await loadGoogleFont('Fira Code', 700, 'D');

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#18181b',
          borderRadius: 40,
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
              fontSize: 128,
              lineHeight: 1,
              color: '#f7f7f7',
              letterSpacing: '-0.04em',
            }}
          >
            D
          </div>
          <div
            style={{
              width: 82,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#FF385C',
              marginTop: 6,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fira Code', data: firaCodeBold, style: 'normal', weight: 700 },
      ],
    },
  );
}

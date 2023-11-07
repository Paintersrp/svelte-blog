import sharp from 'sharp';

export async function load({ fetch }) {
  const response = await fetch(
    `https://images.pling.com/img/00/00/33/91/33/1370727/9d31bafb8d33869275b11364e9709074de4a.png`
  );

  const abuffer = await response.arrayBuffer();
  const buffer = Buffer.from(new Uint8Array(abuffer));
  const buff = await sharp(buffer).toFormat('jpeg').toBuffer();
  const base64data = buff.toString('base64');
  const src = `data:image/jpeg;base64,${base64data.toString()}`;

  return {
    src
  };
}

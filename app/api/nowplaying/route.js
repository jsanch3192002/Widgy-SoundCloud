export async function GET() {
  const username = "jsanch319";
  const apiKey = "39c0f773478ed87257c81720463db657";

  const response = await fetch(
    `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`,
    { cache: "no-store" }
  );

  const data = await response.json();
  const track = data?.recenttracks?.track?.[0];

  const artwork =
    track?.image?.find(img => img.size === "extralarge")?.["#text"] ||
    track?.image?.find(img => img.size === "large")?.["#text"] ||
    "";

  return Response.json({
    title: track?.name || "Nothing Playing",
    artist: track?.artist?.["#text"] || "",
    artwork,
    nowplaying: track?.["@attr"]?.nowplaying === "true",
    url: track?.url || ""
  });
}
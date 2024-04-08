import localFont from "next/font/local";
import { Noto_Sans_JP } from "next/font/google";

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  display: "swap",
});

// Font files can be colocated inside of `pages`
const dsegFont = localFont({ src: "../assets/DSEG7ClassicMini-Bold.woff2" });

export { notoSansJP, dsegFont };

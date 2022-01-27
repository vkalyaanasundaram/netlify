import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import Script from "next/script";
import ReactHtmlParser, { htmlparser2 } from "react-html-parser";
import {
  bgWrap,
  bgText,
  heroDesktopImage,
  heroMobileImage,
} from "../styles/Home.module.css";
import useSWR from "swr";
import { useRouter } from "next/router";
import useInView from "react-cool-inview";
import Link from "next/link";

import Header from "../components/Header";
import Banner from "../components/Banner";

const Footer = dynamic(() => import("../components/Footer"), {
  loading: function ld() {
    return <p>Loading...</p>;
  },
  ssr: false,
});

export default function Home() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error } = useSWR("/api/page/home", fetcher, {
    revalidateOnMount: true,
  });

  let { asPath, pathname } = useRouter();
  const router = useRouter();

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

  const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const { observe, inView } = useInView({
    onEnter: ({ unobserve }) => unobserve(), // only run once
    onLeave: ({ observe }) => observe(),
  });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <>
      <Header />
      {/* Banner Section Start */}
      <section className="relative">
        <div className="opacity-40">
          <div className={heroDesktopImage}>
            {data?.page?.ThreeColumnStaticPage?.banner?.bannerImage?.sourceUrl
              ?.length > 0 && (
              <Image
                src={
                  data?.page?.ThreeColumnStaticPage?.banner?.bannerImage
                    ?.sourceUrl
                }
                width={
                  data?.page?.ThreeColumnStaticPage?.banner?.bannerImage
                    ?.mediaDetails?.width
                }
                // height={data?.bannerImage?.mediaDetails?.height}
                height={350}
                layout="intrinsic"
                objectFit="cover"
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                alt=""
              />
            )}
          </div>
          <div className={heroMobileImage}>
            {data?.page?.ThreeColumnStaticPage?.banner?.mobileBannerImage
              ?.sourceUrl?.length > 0 && (
              <Image
                src={
                  data?.page?.ThreeColumnStaticPage?.banner?.mobileBannerImage
                    ?.sourceUrl
                }
                width={500}
                height={750}
                layout="intrinsic"
                objectFit="cover"
                quality={100}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(
                  shimmer(700, 475)
                )}`}
                alt=""
              />
            )}
          </div>
        </div>
        <div className="container">
          <div className={bgText}>
            <div className="xs:grid col-auto lg:grid grid-cols-2 gap-1 p-3">
              <div className="text-kapitus mb-10">
                <div className="xs:w-full text-3xl md:text-5xl">
                  {data?.page?.ThreeColumnStaticPage?.banner?.bannerTitle}
                </div>
                <div className="text-sm md:text-xl lg:text-2xl my-10">
                  {ReactHtmlParser(
                    data?.page?.ThreeColumnStaticPage?.banner?.bannerDescription
                  )}
                </div>
                <div className="xs:text-xs sm:text-lg mt-5 md:text-2xl text-kapitus">
                  {ReactHtmlParser(
                    data?.page?.ThreeColumnStaticPage?.banner?.bannerButton
                  )}
                </div>
              </div>

              <div className="xs:hidden sm:hidden md:block "></div>
            </div>
          </div>
        </div>
      </section>
      {/* Banner Section End */}

      <section className="container" ref={observe}>
        {inView && (
          <script
            defer
            lazyonload="true"
            src="https://cdn.trustindex.io/loader.js?09a5ee4135268498715860a5eb"
          ></script>
        )}
      </section>
      {/* Three Card Section */}
      <section ref={observe}>
        {inView && (
          <div className="container my-10">
            <section className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3">
              <div className="shadow-md rounded-md overflow-hidden dark:bg-red-100 dark:text-black">
                <div className="grid place-items-center w-full text-right">
                  <Link href="/kapitus-difference" passHref>
                    <Image
                      src="/The-Kapitus-Difference.svg"
                      width="100"
                      height="100"
                      alt=""
                      layout="intrinsic"
                      objectFit="cover"
                      quality={100}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(700, 475)
                      )}`}
                      className="cursor-pointer"
                    />
                  </Link>
                </div>

                <h4 className="font-semibold text-center my-10 uppercase text-kapitus cursor-pointer">
                  <Link href="/kapitus-difference" passHref>
                    THE KAPITUS DIFFERENCE
                  </Link>
                </h4>
              </div>
              <div className="shadow-md rounded-md overflow-hidden dark:bg-red-100 dark:text-black">
                <div className="grid place-items-center w-full text-right">
                  <Link href="/success-stories" passHref>
                    <Image
                      src="/Success-On-Every-Corner.svg"
                      width="100"
                      height="100"
                      alt=""
                      layout="intrinsic"
                      objectFit="cover"
                      quality={100}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(700, 475)
                      )}`}
                      className="cursor-pointer"
                    />
                  </Link>
                </div>
                <h4 className="font-semibold text-center my-10 uppercase text-kapitus cursor-pointer">
                  <Link href="/success-stories" passHref>
                    <a> SUCCESS ON EVERY CORNER</a>
                  </Link>
                </h4>
              </div>
              <div className="shadow-md rounded-md overflow-hidden dark:bg-red-100 dark:text-black">
                <div className="grid place-items-center w-full text-right">
                  <Link href="/problems-we-solve" passHref>
                    <Image
                      src="/Lets-Grow-Together.svg"
                      width="100"
                      height="100"
                      alt=""
                      layout="intrinsic"
                      objectFit="cover"
                      quality={100}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(700, 475)
                      )}`}
                      className="cursor-pointer"
                    />
                  </Link>
                </div>
                <h4 className="font-semibold text-center my-10 uppercase text-kapitus cursor-pointer">
                  <Link href="/problems-we-solve" passHref>
                    LETS GROW TOGETHER
                  </Link>
                </h4>
              </div>
            </section>
          </div>
        )}
      </section>
      {/* Three Card Section End */}

      <section>{inView && <Footer />}</section>
      <Head>
        <script
          defer
          lazyonload="true"
          src="https://cdn.trustindex.io/loader.js?09a5ee4135268498715860a5eb"
        ></script>
      </Head>
    </>
  );
}

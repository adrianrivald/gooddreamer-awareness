import Head from "next/head";

import React, { useEffect, useRef } from "react";
import { Device } from "@capacitor/device";
import { useRouter } from "next/router";
import platform from "platform";
import useIpad from "../../utils/use-ipad";
import useIphone from "../../utils/use-iphone";
import Loading from "../../components/ui/Loading";
import { Meta } from "../../components/Meta";
import { Helmet } from "react-helmet";
import Image from "next/image";
import { dummyContent } from "../../constants/dummyData";

const HOSTURL = process.env.NEXT_PUBLIC_HOST_URL as string;
const URL = process.env.NEXT_PUBLIC_API_URL;
const playStoreURL =
  "https://play.google.com/store/apps/details?id=id.gooddreamer.novel&hl=id";
const appStoreURL = "https://apps.apple.com/id/app/gooddreamer/id6443961969";

export default function DetailPage() {
  const { model: ipadModel } = useIpad();
  const { model: iphoneModel } = useIphone();
  const [isFetching, setIsFetching] = React.useState(true);
  const [isUriInvalid, setIsUriInvalid] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [errMessage, setErrMessage] = React.useState("");
  const [devicePlatform, setDevicePlatform] = React.useState("");
  const [uuid, setUuid] = React.useState("");
  const [deviceWidth, setDeviceWidth] = React.useState(0);
  const router = useRouter();
  const { query } = router;
  const uri = query?.slug;
  let payload: any = {};
  const deviceInfo = platform;
  const redirectedURL = "gooddreamer://";
  // apicagent - buat nge get USER AGENT info = FREE
  // ip-api - buat nge get lokasi, timezone, dan ISP = FREE but This endpoint is limited to 45 requests per minute from an IP address.
  // ipfy - buag nge get IP Address = FREE 1000 request doang, Paid 390$ upto 300.000 request
  // ipinfo - buat nge get lokasi , ISP, timezone = FREE 50.000 request per bulan , Paid $99 150 request perbulan
  // openstreetmap.org - buat nget get lokasi = FREE
  // capacitors - buat nge get device model dan device ID (generated for web version)

  function detectBrowser() {
    var userAgent = navigator.userAgent;
    if (userAgent.indexOf("Edg") > -1) {
      return "Microsoft Edge";
    } else if (userAgent.indexOf("Chrome") > -1) {
      return "Chrome";
    } else if (userAgent.indexOf("Firefox") > -1) {
      return "Firefox";
    } else if (userAgent.indexOf("Safari") > -1) {
      return "Safari";
    } else if (userAgent.indexOf("Opera") > -1) {
      return "Opera";
    } else if (
      userAgent.indexOf("Trident") > -1 ||
      userAgent.indexOf("MSIE") > -1
    ) {
      return "Internet Explorer";
    }

    return "Unknown";
  }

  const retrieveData = async () => {
    const info = await Device.getInfo();
    const initData = {
      browser: detectBrowser(),
      os: deviceInfo?.os?.family,
      os_ver:
        deviceInfo?.os?.family === "Android"
          ? (deviceInfo?.os?.version ?? "").split(".")[0]
          : deviceInfo?.os?.version?.split(".")[2] === undefined
          ? deviceInfo?.os?.version
          : deviceInfo?.os?.version,
      uri,
      device_model:
        deviceInfo?.product === "iPhone" || info?.model === "iPhone"
          ? iphoneModel
          : deviceInfo?.product === "iPad" || info?.model === "iPad"
          ? ipadModel
          : deviceInfo?.product ?? info?.model,
    };

    if (typeof window !== "undefined") {
      if (window.screen.width > window.screen.height) {
        Object.assign(initData, {
          device_width: window.screen.height,
          device_height: window.screen.width,
        });
      } else {
        Object.assign(initData, {
          device_width: window.screen.width,
          device_height: window.screen.height,
        });
      }
    }

    const getOtherInfo = async () => {
      await fetch("https://api.ipify.org/?format=json").then((res) =>
        res.json().then(async (item) => {
          Object.assign(payload, { ip_address: item?.ip });
          await fetch(
            `https://ipinfo.io/${item?.ip}?token=5e16f86f091ced`
          ).then((res) =>
            res.json().then(async (info) => {
              Object.assign(payload, {
                isp: info?.org,
              });

              if (Object.keys(info).length > 0) {
                const postDefferedLink = async () => {
                  try {
                    await fetch(`${URL}deferred-link/click`, {
                      method: "POST",
                      body: JSON.stringify(payload),
                      headers: {
                        "Content-type": "application/json",
                      },
                    }).then(
                      (res) =>
                        res.json().then((val) => {
                          setDevicePlatform(payload?.os?.toLowerCase());
                          setUuid(val?.data?.uuid);
                          setDeviceWidth(payload?.device_width);
                          if (
                            val?.message !== "DeferredLink tidak ditemukan."
                          ) {
                            // alert("sukses");
                            // Redirect with condition and timeout (without isRedir param)
                            // if (query["isRedir"] === undefined) {
                            //   redirect(val?.data?.uuid);

                            //   setTimeout(() => {
                            //     if (payload?.os?.toLowerCase() === "android") {
                            //       window.location.href = playStoreURL;
                            //     } else {
                            //       window.location.href = appStoreURL;
                            //     }
                            //   }, 10000);
                            // }
                            // Redirect without condition (with isRedir param)
                            // else {
                            if (payload?.os?.toLowerCase() === "android") {
                              getContentDetail();
                              // window.location.href = `intent://affiliate/${val?.data?.uuid}#Intent;scheme=gooddreamer;package=id.gooddreamer.novel;S.browser_fallback_url=${playStoreURL};end`;
                            } else if (
                              payload?.os.toLowerCase() === "ios" ||
                              (payload?.os.toLowerCase() === "os x" &&
                                payload?.device_width <= 1024)
                            ) {
                              getContentDetail();
                              // setTimeout(function () {
                              //   window.location.href =
                              //     HOSTURL + `affiliate/${val?.data?.uuid}`;
                              // }, 25);
                              // window.location.href =
                              //   redirectedURL + `affiliate/${val?.data?.uuid}`;
                            } else {
                              getContentDetail();
                              // window.history.pushState(
                              //   {},
                              //   "",
                              //   `${window.location.pathname}?redir=true`
                              // );

                              // Disabled
                              // window.location.href =
                              //   window.location.pathname + "?redir=true";
                              // Disabled

                              // router.push({
                              //   pathname: `/${uri}`,
                              //   query: {
                              //     redir: true,
                              //   },
                              // });
                            }
                            // }

                            // setMessage(val?.message);
                            // setIsFetching(false);
                          } else {
                            setIsUriInvalid(true);
                            setMessage("Maaf, awareness link tidak ditemukan.");
                            setIsFetching(false);
                            // setTimeout(() => {
                            //   router.push(HOSTURL);
                            // }, 4000);
                          }
                        })
                      // .catch((err) => {
                      //   alert("gagal catch fetch");
                      //   setErrMessage(JSON.stringify(err));
                      // })
                    );
                  } catch (err) {
                    // alert("gagal try catch");
                    // console.log(err, "err");
                    setMessage("Gagal mengirim data, sedang mengalihkan…");
                    setIsFetching(false);
                    setTimeout(() => {
                      router.push(HOSTURL);
                    }, 4000);
                  }
                };
                if ((window.navigator as any).userAgentData !== undefined) {
                  await (window.navigator as any).userAgentData
                    .getHighEntropyValues([
                      "architecture",
                      "model",
                      "platform",
                      "platformVersion",
                      "fullVersionList",
                    ])
                    .then(async (ua: any) => {
                      const model = ua["model"];
                      const platform = ua["platform"];
                      const platformVersion = ua["platformVersion"];
                      if (
                        model !== "" &&
                        platform !== "" &&
                        platformVersion !== ""
                      ) {
                        Object.assign(payload, {
                          device_model: model,
                          os: platform,
                          os_ver:
                            platform === "Android"
                              ? platformVersion?.split(".")[0]
                              : platformVersion?.split(".")[2] === undefined
                              ? platformVersion
                              : platformVersion,
                        });
                      }
                      // setIsFetching(false);
                      postDefferedLink();
                    });
                } else {
                  // setIsFetching(false);
                  postDefferedLink();
                }
              }
            })
          );
        })
      );
    };

    Object.assign(payload, initData);

    if (Object.keys(info).length > 0 || payload["os"]) {
      // Get User Agent / Device Info
      await fetch(
        "https://api.apicagent.com?" +
          new URLSearchParams({
            ua: window.navigator.userAgent,
          }).toString()
      ).then((res) =>
        res.json().then((item) => {
          Object.assign(payload, { device_screen: item?.device?.type });
          if (Object.keys(item).length > 0) {
            getOtherInfo();
          }
        })
      );
    }
  };

  type ContentDetail = {
    banner: string;
    content: string;
    title: string;
    subtitle: string;
    id: number;
  };

  const [contentDetail, setContentDetail] = React.useState<ContentDetail>();

  // Fetching Content
  const getContentDetail = async () => {
    await fetch(`${URL}awareness/${uri}`).then((res) =>
      res.json().then((awareness) => {
        setIsFetching(false);
        setContentDetail(awareness?.data);
        console.log(awareness, "awareness");
      })
    );
  };

  // Post log
  const postAwarenessLog = async (destination: string) => {
    await fetch(`${URL}awareness/${uri}/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        destination: destination,
      }),
    }).then((res) =>
      res.json().then(() => {
        if (destination === "android") {
          window.location.href = playStoreURL;
        } else if (
          devicePlatform === "ios" ||
          (devicePlatform === "os x" && deviceWidth <= 1024)
        ) {
          window.location.href = appStoreURL;
        } else {
          window.location.href = window.location.pathname + "?redir=true";
        }
      })
    );
  };

  const onClickContinue = async () => {
    await postAwarenessLog(
      devicePlatform === "android" || devicePlatform === "ios"
        ? devicePlatform
        : "desktop"
    );
  };

  useEffect(() => {
    // initiate to send data
    if (uri !== undefined && router.query["isOpenApp"] === undefined)
      retrieveData();
  }, [router]);

  return (
    <>
      <Helmet>
        {/* <Meta /> */}
        <title>Free Novel</title>
      </Helmet>
      {isFetching ? (
        <>
          <Loading text="Sedang memuat konten, harap tunggu…" />
        </>
      ) : (
        <>
          {!isUriInvalid ? (
            <div className="">
              <Head>
                <title>Free Novel</title>
                <meta name="description" content="Content page" />
              </Head>
              <main className="max-w-[80rem] flex justify-center mx-auto px-4 pt-4 mb-32">
                <div id="content">
                  <h1 className="font-bold text-4xl mt-4">
                    {contentDetail?.title}
                  </h1>
                  <p className="text-2xl mt-8 text-[#68696a]">
                    {contentDetail?.subtitle}
                  </p>
                  <img
                    src={contentDetail?.banner}
                    className="flex justify-center w-full mt-4"
                  />
                  <p className="mt-4 text-2xl leading-10">
                    {contentDetail?.content}
                  </p>
                  <div
                    onClick={onClickContinue}
                    className="my-16 flex justify-center text-[#6C4E9A] text-3xl underline font-bold"
                  >
                    Klik Bab Berikutnya
                  </div>
                </div>
                <footer className="fixed bottom-0 bg-white p-4 w-full">
                  <button
                    onClick={onClickContinue}
                    className="p-4 text-3xl rounded-lg bg-[#6C4E9A] w-full text-white font-bold"
                  >
                    👉LANJUTKAN MEMBACA👈
                  </button>
                </footer>
              </main>
            </div>
          ) : (
            <div className="">
              <Head>
                <title>Free Novel</title>
                <meta name="description" content="Content page" />
              </Head>
              <main className="max-w-[80rem] flex justify-center mx-auto px-4 pt-4 mb-32">
                <div id="content">Konten tidak ditemukan</div>
              </main>
            </div>
          )}
        </>
      )}
    </>
  );
}

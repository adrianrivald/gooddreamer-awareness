import React, { useEffect } from "react";

function useIphone () {
    const [model, setModel] = React.useState("")
    const [renderer, setRenderer] = React.useState("")
    function getiPhoneModel() {
        // Get renderer info from cavas.
        if (typeof document !== "undefined") {
          var canvas = document.createElement("canvas");
          if (canvas) {
            var context =
              canvas.getContext("webgl", { powerPreference: "high-performance" }) ||
              (canvas.getContext("experimental-webgl", {
                powerPreference: "high-performance",
              }) as any);
            if (context) {
              var info = context.getExtension("WEBGL_debug_renderer_info");
              if (info) {
                setRenderer(context.getParameter(info.UNMASKED_RENDERER_WEBGL));
              }
            }
          }
        }
      
        if (typeof window !== "undefined") {
          var ratio = window.devicePixelRatio;
          // iPhone XS Max / iPhone 11 Pro Max / iPhone XR / iPhone 11
          if (window.screen.height / window.screen.width == 896 / 414) {
            switch (ratio) {
              case 2:
                return "iPhone XR / iPhone 11";
              case 3:
                return "iPhone XS Max / iPhone 11 Pro Max";
            }
          }
      
          // iPhone 12 Pro Max / iPhone 13 Pro Max / iPhone 14 Plus / iPhone 16 Plus / iPhone 16 Pro Max
          else if (window.screen.height / window.screen.width == 926 / 428) {
            switch (ratio) {
              default:
                return "iPhone 12 Pro Max / iPhone 13 Pro Max / iPhone 14 Plus / iPhone 16 Plus / iPhone 16 Pro Max";
              case 3:
                return "iPhone 12 Pro Max / iPhone 13 Pro Max / iPhone 14 Plus / iPhone 16 Plus / iPhone 16 Pro Max";
            }
          }
      
          // iPhone 14 Pro / iPhone 15 Pro / iPhone
          else if (window.screen.height / window.screen.width == 852 / 393) {
            switch (ratio) {
              default:
                return "iPhone 14 Pro / iPhone 15 Pro / iPhone";
              case 3:
                return "iPhone 14 Pro / iPhone 15 Pro / iPhone 15";
            }
          }
      
          // iPhone 14 Pro Max / iPhone 15 Pro Max / iPhone 15 Plus
          else if (window.screen.height / window.screen.width == 932 / 430) {
            switch (ratio) {
              default:
                return "iPhone 14 Pro Max / iPhone 15 Pro Max / iPhone 15 Plus";
              case 3:
                return "iPhone 14 Pro Max / iPhone 15 Pro Max / iPhone 15 Plus";
            }
          }
      
          // iPhone 12 / iPhone 12 Pro / iPhone 13 / iPhone 13 Pro / iPhone 14
          else if (window.screen.height / window.screen.width == 844 / 390) {
            switch (ratio) {
              default:
                return "iPhone 12 / iPhone 12 Pro / iPhone 13 / iPhone 13 Pro / iPhone 14";
              case 3:
                return "iPhone 12 / iPhone 12 Pro / iPhone 13 / iPhone 13 Pro / iPhone 14";
            }
          }
      
          // iPhone X / iPhone XS / iPhone 11 Pro / iPhone 12 Mini / iPhone 13 Mini
          else if (window.screen.height / window.screen.width == 812 / 375) {
            switch (ratio) {
              default:
                return "iPhone X / iPhone XS / iPhone 11 Pro / iPhone 12 Mini / iPhone 13 Mini";
              case 3:
                return "iPhone X / iPhone XS / iPhone 11 Pro / iPhone 12 Mini / iPhone 13 Mini";
            }
          }
          // iPhone 6 Plus / iPhone 6s Plus / iPhone 7 Plus / iPhone 8 Plus
          else if (window.screen.height / window.screen.width == 736 / 414) {
            switch (ratio) {
              default:
                return "iPhone 6 Plus / iPhone 6s Plus / iPhone 7 Plus / iPhone 8 Plus";
              case 3:
                return "iPhone 6 Plus / iPhone 6s Plus / iPhone 7 Plus / iPhone 8 Plus";
            }
          }
          // iPhone 6 / iPhone 7 / iPhone 8 / iPhone SE 2020 / iPhone SE 2022
          else if (window.screen.height / window.screen.width == 667 / 375) {
            if (ratio == 2) {
              switch (ratio) {
                default:
                  return "iPhone 6 / iPhone 7 / iPhone 8 / iPhone SE 2020 / iPhone SE 2022";
                case 2:
                  return "iPhone 6 / iPhone 7 / iPhone 8 / iPhone SE 2020 / iPhone SE 2022";
              }
            }
          }
          // iPhone 5, iPhone 5C, iPhone 5S, iPhone SE // or in zoom mode: iPhone 5, iPhone 5C, iPhone 5S, iPhone SE, iPhone 6, iPhone 6S, iPhone 7 or iPhone 8
          else if (window.screen.height / window.screen.width == 1.775) {
            switch (renderer) {
              default:
                return "iPhone 5, 5C, 5S, SE or 6, 6s, 7 and 8 (display zoom)";
              case "PowerVR SGX 543":
                return "iPhone 5 or 5c";
              case "Apple A7 GPU":
                return "iPhone 5s";
              case "Apple A8 GPU":
                return "iPhone 6 (display zoom)";
              case "Apple A9 GPU":
                return "iPhone SE or 6s (display zoom)";
              case "Apple A10 GPU":
                return "iPhone 7 (display zoom)";
              case "Apple A11 GPU":
                return "iPhone 8 (display zoom)";
            }
          }
          // iPhone 4 or 4s
          else if (window.screen.height / window.screen.width == 1.5 && ratio == 2) {
            switch (renderer) {
              default:
                return "iPhone 4 / 4s";
              case "PowerVR SGX 535":
                return "iPhone 4";
              case "PowerVR SGX 543":
                return "iPhone 4s";
            }
          }
          // iPhone 1, 3G or 3GS
          else if (window.screen.height / window.screen.width == 1.5 && ratio == 1) {
            switch (renderer) {
              default:
                return "iPhone 1, 3G or 3GS";
              case "ALP0298C05":
                return "iPhone 3GS";
              case "S5L8900":
                return "iPhone 1, 3G";
            } // Not an iPhone.
          } else {
            return "Not an iPhone";
          }
        }
    }

    useEffect(() => {
        if (typeof document !== "undefined" && typeof window !== "undefined") {
            setModel(getiPhoneModel() as string)
        }
    }, [])

    return {model, renderer}
}
export default useIphone
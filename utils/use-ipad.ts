import React, {
    useEffect
} from "react";


function useIpad() {

    const [model, setModel] = React.useState("");

    const getIpadModel = () => {
        // Create a canvas element which can be used to retreive information about the GPU.
        if (typeof document !== "undefined") {
            var canvas = document.createElement("canvas");
            if (canvas) {
                var context = canvas.getContext("webgl") || canvas.getContext("experimental-webgl") as any;
                if (context) {
                    var info = context.getExtension("WEBGL_debug_renderer_info");
                    if (info) {
                        var renderer = context.getParameter(info.UNMASKED_RENDERER_WEBGL);
                    }
                }
            }
        }
        if (typeof window !== "undefined") {
            var ratio = window.devicePixelRatio;
            if (window.screen.height / window.screen.width == 1366 / 1024) {
                switch (ratio) {
                    case 2:
                        return `iPad Pro (6th gen 12.9") / iPad Pro (5th gen 12.9") / iPad Pro (4th gen 12.9") / iPad Pro (3rd gen 12.9") / iPad Pro (2nd gen 12.9") / iPad Pro (1st gen 12.9")`;
                }
            }

            // iPad Pro (6th gen 11") / iPad Pro (5th gen 11") / iPad Pro (4th gen 11") / iPad Pro (3rd gen 11")
            else if (window.screen.height / window.screen.width == 1194 / 834) {
                switch (ratio) {
                    default:
                        return `iPad Pro (6th gen 11") / iPad Pro (5th gen 11") / iPad Pro (4th gen 11") / iPad Pro (3rd gen 11")`;
                    case 2:
                        return `iPad Pro (6th gen 11") / iPad Pro (5th gen 11") / iPad Pro (4th gen 11") / iPad Pro (3rd gen 11")`;
                }
            } 
            
            // iPad 10th gen / iPad Air (5th gen) / iPad Air (4th gen)
            else if (window.screen.height / window.screen.width == 1180 / 820) {
                switch (ratio) {
                    default:
                        return `iPad 10th gen / iPad Air (5th gen) / iPad Air (4th gen)`;
                    case 2:
                        return `iPad 10th gen / iPad Air (5th gen) / iPad Air (4th gen)`;
                }
            } 
            
            // iPad Mini (6th gen)
            else if (window.screen.height / window.screen.width == 1133 / 744) {
                switch (ratio) {
                    default:
                        return `iPad Mini (6th gen)`;
                    case 2:
                        return `iPad Mini (6th gen)`;
                }
            } 
            
            // iPad 9th gen / iPad 8th gen / iPad 7th gen
            else if (window.screen.height / window.screen.width == 1080 / 810) {
                switch (ratio) {
                    default:
                        return `iPad 9th gen / iPad 8th gen / iPad 7th gen`;
                    case 2:
                        return `iPad 9th gen / iPad 8th gen / iPad 7th gen`;
                }
            } 
            
            // iPad Mini (5th gen) / iPad 6th gen / iPad 5th gen / iPad Pro (1st gen 9.7”) / iPad mini 4 / iPad Air 2 / iPad mini 3 / iPad mini 2 / iPad Air / iPad 4th gen / iPad 3rd gen / iPad mini/ iPad 2 / iPad 1st gen
            else if (window.screen.height / window.screen.width == 1024 / 768) {
                switch (ratio) {
                    default:
                        return `iPad Mini (5th gen) / iPad 6th gen / iPad 5th gen / iPad Pro (1st gen 9.7”) / iPad mini 4 / iPad Air 2 / iPad mini 3 / iPad mini 2 / iPad Air / iPad 4th gen / iPad 3rd gen / iPad mini/ iPad 2 / iPad 1st gen`;
                    case 2:
                        return `iPad Mini (5th gen) / iPad 6th gen / iPad 5th gen / iPad Pro (1st gen 9.7”) / iPad mini 4 / iPad Air 2 / iPad mini 3 / iPad mini 2 / iPad Air / iPad 4th gen / iPad 3rd gen`;
                    case 1:
                        return `iPad mini/ iPad 2 / iPad 1st gen`;
                }
            } 
            
            // iPad Air (3rd gen) / iPad Pro (2nd gen 10.5")
            else if (window.screen.height / window.screen.width == 1112 / 834) {
                switch (ratio) {
                    default:
                        return `iPad Air (3rd gen) / iPad Pro (2nd gen 10.5")`;
                    case 2:
                        return `iPad Air (3rd gen) / iPad Pro (2nd gen 10.5")`;
                }
            }
            else {
                return "Not an iPad";
            }
        }
    }

    useEffect(() => {
        if (typeof document !== "undefined" && typeof window !== "undefined") {
            setModel(getIpadModel() as string)
        }
    }, [])

    return {
        model
    };
}


export default useIpad;
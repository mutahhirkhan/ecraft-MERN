import { useEffect, useState } from "react";
import moment from "moment";

export function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined,
    });
    useEffect(() => {
        // Handler to call on window resize
        function handleResize() {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }
        // Add event listener
        window.addEventListener("resize", handleResize);
        // Call handler right away so state gets updated with initial window size
        handleResize();
        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
}

export const getLat = (location) => {
    if (!location) {
        return 25.3430485;
    }
    return location[0];
};

export const getLng = (location) => {
    if (!location) {
        return 50.6572839;
    }
    return location[1];
};

export const getFullName = (data) => {
    if (!data) {
        return " ";
    }
    return data.firstName + " " + data.lastName;
};

export const checkDisabledDate = (current) => {
    return current && current < moment().startOf("day");
};

export const startAndEndDate = (date) => {
    if (date) return date?.toISOString();
    else return null;
};

export const jsonToQueryString = (data) => {
    if (!data) {
        return "";
    }
    const params = Object.fromEntries(Object.entries(data).filter(([_, v]) => v != null));
    // console.log(params);
    // if(params.length){
    //   const newId = params.map((i)=>)
    // }

    // const newId = id.map((i) => `&jobPostId=${i}`);
    // const newIDString = newId.join("");

    return "?" + new URLSearchParams(params).toString();
};

export const showTempImgFromBaseURL = (file, Fn) => {
    if (file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            const blobUrl = reader.result;
            Fn(blobUrl);
            // console.log(blobUrl)
            return blobUrl;
            // if (document.querySelector(className)) document.querySelector(className).src = blobUrl;
        };
    }
};

// export const filterOption = (input, option) => option.children?.[1]?.toLowerCase().indexOf(input.toLowerCase()) >= 0
export const filterOption = (input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;

export const isObjectFilled = (obj) => {
    if (obj)
        if (Object.keys(obj).length >= 1) return true;
        else return false;
    else return false;
};


export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
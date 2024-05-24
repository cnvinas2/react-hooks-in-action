import React from 'react';
import {Suspense} from "react";
import {useQuery} from "react-query";

export default function Avatar ({src, alt, fallbackSrc, ...props}: any) {
  return (
    <div className="user-avatar">
      <Suspense fallback={<img src={fallbackSrc} alt="Fallback Avatar"/>}>
        <Img src={src} alt={alt} {...props}/>
      </Suspense>
    </div>
  );
}

function Img ({src, alt, ...props}: any) {
  const {data: imgObject}: any = useQuery(
    src,
    () => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    }),
    {suspense: true}
  );

  return <img src={imgObject.src} alt={alt} {...props}/>
}
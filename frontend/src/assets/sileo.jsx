import { sileo, Toaster } from "sileo";

export default function Sileo() {
  return (
        <>
        <Toaster position="top-right" options={{
            fill: "#000000",
            styles : {title: {color: "#ffffff"}, description: {color: "#ffffff"}}
        }}/>
        </>
      
  );
}
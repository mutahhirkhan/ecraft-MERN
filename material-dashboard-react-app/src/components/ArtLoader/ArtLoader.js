import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={400}
    height={460}
    viewBox="0 0 400 460"
    backgroundColor="#c4c4c4"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="382" cy="24" r="15" /> 
    <rect x="48" y="373" rx="2" ry="2" width="140" height="10" /> 
    <rect x="-1" y="43" rx="2" ry="2" width="400" height="269" /> 
    <rect x="28" y="409" rx="2" ry="2" width="165" height="9" /> 
    <rect x="16" y="368" rx="2" ry="2" width="21" height="20" /> 
    <rect x="24" y="336" rx="2" ry="2" width="158" height="8" />
  </ContentLoader>
)

export default MyLoader
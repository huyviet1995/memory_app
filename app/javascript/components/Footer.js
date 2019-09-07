import React from 'react';

export default class Footer extends React.Component {


  render() {
    return (
      <div className = 'footer'>
        <div className = 'container'>
          A product made by Viet Dang, all rights reserved!
        </div>
        <div className = 'my-info'>
          <div className = 'my-phone-number'> (84)906-611-895 </div>
          <div className = 'my-email'> vdang@gustavus.edu </div>
          <div className = 'my-address'> Dist 2, Ho Chi Minh city </div>
        </div>
        <div className = 'social-media-icon'>
          <a href = {"https://www.facebook.com/huyviet.dang.7"} target = {"_blank"}>
            <img src = {require("../../assets/images/facebook_icon.png")} alt = {"facebook"}>
            </img>
          </a>
          <a href = {"https://www.linkedin.com/in/viet-dang"} target = {"_blank"}>
            <img src = {require("../../assets/images/Linkedin_icon.png")} alt = {"linkedin"}>
            </img>
          </a>
        </div>
      </div>
    )
  }
}
import React from "react";
import {
  EmailIcon,
  FacebookIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  WhatsappIcon
} from "react-share";

import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  WhatsappShareButton
} from 'react-share';


const SocialWrapper = ({url,cover}) => {

  return (
    <React.Fragment>
  
    
    <div className="social__div">
    
      <EmailShareButton className="social" url={url} >
        <EmailIcon size={35} round={true}  />
      </EmailShareButton>

      <span>Email</span>
    
    </div>



    <div className="social__div">
    
    <FacebookShareButton  className="social"  url={url} >
      <FacebookIcon size={35} round={true} />
    </FacebookShareButton>

    <span>Facebook</span>
    
    </div>



    <div className="social__div">
    
    <HatenaShareButton  className="social" url={url} >
      <HatenaIcon size={35} round={true} />
    </HatenaShareButton>

    <span>Hatena</span>
    
    </div>

    

    <div className="social__div">
    
    <TwitterShareButton  className="social" url={url} >
      <TwitterIcon size={35} round={true} />
    </TwitterShareButton>

    <span>Twitter</span>
    
    </div>


    <div className="social__div">
    
    <InstapaperShareButton  className="social" url={url} >
      <InstapaperIcon size={35} round={true} />
    </InstapaperShareButton>

    <span>Instapaper</span>
    
    </div>



    <div className="social__div">
    
    <WhatsappShareButton  className="social" url={url} >
      <WhatsappIcon size={35} round={true} />
    </WhatsappShareButton>

    <span>Whatsapp</span>
    
    </div>


    <div className="social__div">
    
    <LinkedinShareButton  className="social" url={url} >
      <LinkedinIcon size={35} round={true} />
    </LinkedinShareButton>

    <span>Linkedin</span>
    
    </div>



    <div className="social__div">

    <RedditShareButton  className="social" url={url} >
      <RedditIcon size={35} round={true} />
    </RedditShareButton>

    <span>Reddit</span>

    </div>



    <div className="social__div">

    <LineShareButton  className="social" url={url}>
      <LineIcon size={35} round={true} />
    </LineShareButton>

    <span>Line</span>

    </div>


    <div className="social__div">
    
    <PinterestShareButton  className="social" media={cover} url={url}>
      <PinterestIcon size={35} round={true} />
    </PinterestShareButton>

    <span>Pinterest</span>
    
    </div>


    

    <div className="social__div">
    
    <OKShareButton  className="social" url={url} >
      <OKIcon size={35} round={true} />
    </OKShareButton>

    <span>Ok</span>
    
    </div>


    <div className="social__div">
    
    <TelegramShareButton  className="social" url={url} >
      <TelegramIcon size={35} round={true} />
    </TelegramShareButton>

    <span>Telegram</span>
    
    </div>



    <div className="social__div">
    
    <MailruShareButton  className="social" url={url} >
      <MailruIcon size={35} round={true} />
    </MailruShareButton>

    <span>Mailru</span>
    
    </div>




    <div className="social__div">
    
    <TumblrShareButton  className="social" url={url} >
      <TumblrIcon size={35} round={true} />
    </TumblrShareButton>

    <span>Tumblr</span>
    
    </div>



    <div className="social__div">
    
    <ViberShareButton  className="social" url={url} >
      <ViberIcon size={35} round={true} />
    </ViberShareButton>

    <span>Viber</span>
    
    </div>


  

  
  </React.Fragment>
  )

}

export default SocialWrapper;
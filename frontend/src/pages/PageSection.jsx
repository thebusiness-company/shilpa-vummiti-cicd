import React, { use } from 'react'
import AboutMe from './AboutMe'
import Article from './Article'
import Press from './Press'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PageSection = () => {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash;
    
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }else {
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }, [location]);
  return (
    <>
    <div id='About'>
    <AboutMe/>
    </div>
    <div id='Article'>
    <Article/>
    </div>
    <div id='Press'>
    <Press/>
    </div>
    </>
  )
}

export default PageSection

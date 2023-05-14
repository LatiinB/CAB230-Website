import React, {useState} from 'react'
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselCaption,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css'
import './Pages.css'
import splashImage1 from '../static/splash1.jpg'
import splashImage2 from '../static/splash2.jpg'
import splashImage3 from '../static/splash3.jpg'
import MyNavbar from './MyNavbar';
import MyFooter from './MyFooter';


const splashImages = [
  {
    src: splashImage1,
    altText: '',
    caption: '',
    key: 1,
  },
  {
    src: splashImage2,
    altText: '',
    caption: '',
    key: 2,
  },
  {
    src: splashImage3,
    altText: '',
    caption: '',
    key: 3,
  },
];




function Home(args) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === splashImages.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? splashImages.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };


  const slides = splashImages.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <img src={item.src} alt={item.altText} />
        <CarouselCaption
          captionText={item.caption}
          captionHeader={item.caption}
        />
      </CarouselItem>
    );
  });

  return (
    <div>
      <MyNavbar />
      <h1 className='AppHeader'>Welcome to Mov.ie, the best movie aggregator and searcher around!</h1>
      <div className='carouselBox'>
        <Carousel
          activeIndex={activeIndex}
          next={next}
          previous={previous}
          {...args}
        >
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={next}
          />
        </Carousel>
      </div>
      <div className='welcomeMessage'>
        <p>To find a movie, go to the <a href="/movies/" className='titleLink'>Movie Search</a> page. You can browse all the movies, or look at details!</p>
      </div> 
      <div className='finePrint'>
      <p>If you're a new user, consider <a href="/signup/" className='titleLink'>signing up now!</a></p>
      </div>
      <MyFooter />
    </div>
  );
}

  
export default Home;
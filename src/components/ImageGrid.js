import React, { useState, useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Slide from '@mui/material/Slide';

const ImageGrid = ({ setSelectedImg }) => {
  const { docs } = useFirestore('images');

  const [imageSet, setImageSet] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const getImages = (image) => {
    const promise = new Promise(function(resolve, reject) {
      let img = new Image();
      img.src = image.url;
      img.onload = () => {
        console.log(img)
        // console.log(x)
        resolve(img);
      };
    });
    return promise;
  }

  useEffect(() => {
    
    const images = docs.map(getImages);
    // console.log(images)
    Promise.all(images).then((values) => {
      // console.log(values);
      if (images.length > 0) {
        setImageSet(values);
        setIsLoading(false);
      }
      },
      function(error) {
        console.log("error ", error);
      }
    )
  }, [docs]);
  
  const renderImage = (item) => {
    return (
      <ImageListItem key={item.src} onClick={() => setSelectedImg(item.src)}>
        <img
          src={`${item.src}?w=248&fit=crop&auto=format`}
          srcSet={`${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={'not found'}
        />
      </ImageListItem>
    )
  }
  
  return (
    isLoading ? <div> Loading...</div> : 

    // <Box>

    <Slide direction="up" in={!isLoading} timeout={1000}>
    <ImageList variant="masonry" cols={3} gap={8}>
    {imageSet.map((item) => (
      renderImage(item)
    ))}
    </ImageList>

    </Slide>
  // </Box>
    

    // <div className="img-grid">
    //   {docs && docs.map(doc => (
    //     <div className="img-wrap" key={doc.id} 
    //       layout
    //       whileHover={{ opacity: 1 }}s
    //       onClick={() => setSelectedImg(doc.url)}
    //     >
    //       <img src={doc.url} alt="uploaded pic"/>
    //     </div>
    //   ))}
    // </div>
  )
}

export default ImageGrid;

import React, { useState, useEffect } from 'react';
import useFirestore from '../hooks/useFirestore';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Slide from '@mui/material/Slide';

const ImageGrid = ({ setSelectedImg }) => {
  // const [imageSet, setImageSet] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { docs } = useFirestore('images');
  // console.log(docs)
  // useEffect(() => {
  //   if (docs.length > 0) {
  //     setIsLoading(false)
  //   }
  // }, [docs]);
  
  const renderImage = (item) => {
    // console.log(item);
    return (
      <ImageListItem key={item.id} onClick={() => setSelectedImg(item)}>
        <img
          src={`${item.url}?w=248&fit=crop&auto=format`}
          srcSet={`${item.url}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={'not found'}
        />
      </ImageListItem>
    )
  }

  return (
    isLoading ? <div> Loading...</div> : 

    <Slide direction="up" in={!isLoading} timeout={1000}>
    <ImageList variant="masonry" cols={3} gap={8}>
    {docs.map((item) => (
      renderImage(item)
    ))}
    </ImageList>
    </Slide>
  )
}

export default ImageGrid;

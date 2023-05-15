import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import TabContainer from './tab-container';
import axios from 'axios';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

import likeImage from '../assets/img/heart.png';
import dislikeImage from '../assets/img/dislike.png';


import { db } from './../public/firebase/firebase';




const ImageTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ImageContainer = styled.div`
width: 100%;
max-width: 100vw;
  flex: 0.7;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:  ${props => props.theme.background};
`;

const ButtonContainer = styled.div`
  flex: 0.2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:  ${props => props.theme.background};
`;



const StyledImage = styled.img`
  width: 100%;
  height: auto;
`;


const StyledImaged = styled.img`
  width: 10%;
  height: auto;
  margin-right: 30px;
  margin-left: 30px;

  /* Estilos adicionales cuando se hace clic en la imagen */
  ${props =>
    props.isClicked &&
    css`
      background-color: #0d46bb;
      border-radius: 50%;
      padding: 20px;
    `}
`;



const Sport = () => {

  const [imageURL, setImageURL] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [myDocument, setMyDocument] = useState('');
  const [randomImage, serandomImage] = useState([]);


  const [isDislikeClicked, setIsDislikeClicked] = useState(false);
  const [isLikeClicked, setIsLikeClicked] = useState(false);



  useEffect(() => {

    if (!dataLoaded) { // Verificar si los datos ya han sido cargados
      const fetchData = async () => {
        try {
          const params = {
            key: '15145747-1ac183f7411930ca1a05f29f6',
            q: 'sports',
            min_width: 250,
            image_type: 'photo',
            per_page: 3,
            safesearch: true,
            page: getRandomIndex(2, 50), // Obtener un número aleatorio entre 2 y 50
          };
          const response = await axios.get('https://pixabay.com/api/', { params });
          const randomImageData = response.data.hits[Math.floor(Math.random() * response.data.hits.length)];

          setImageURL(randomImageData.webformatURL);
          serandomImage(randomImageData);
          setDataLoaded(true); // Marcar los datos como cargados
        } catch (error) {
          console.error(error);
        }
      };
      const getRandomIndex = (min, max) => {
        const seed = Date.now();
        const random = createRandomNumberGenerator(seed);
        return Math.floor(random() * (max - min + 1) + min);
      };

      fetchData();
    }
  }, [dataLoaded, randomImage]);

  const createRandomNumberGenerator = (seed) => {
    let value = seed;

    return () => {
      value = (value * 9301 + 49297) % 233280;
      return Math.floor(value / 233280);
    };
  };


  const handleLike = async (val) => {
    setIsLikeClicked(val);
    setIsDislikeClicked(!val);

    const timestamp = firebase.firestore.Timestamp.now();
    const { webformatURL, id, type, tags, likes } = randomImage;
    const uid = localStorage.getItem('uid');
    const parentDocRef = db.collection('playgreen-sports').doc(uid);

    if (myDocument === '') {
      const childDocRef = parentDocRef.collection('history').doc();
      const childDocId = childDocRef.id;
      setMyDocument(childDocId);

      await childDocRef.set({
        imageURL: webformatURL,
        id,
        type,
        tags,
        likes,
        like: val,
        timestamp,
      });
    } else {
      const childDocRef = parentDocRef.collection('history').doc(myDocument);

      await childDocRef.set({
        imageURL: webformatURL,
        id,
        type,
        tags,
        likes,
        like: val,
        timestamp,
      });
    }
  };


  return (
    <ImageTabWrapper>
      <ImageContainer>
        {imageURL && <StyledImage src={imageURL} alt="Random Sports" />}

      </ImageContainer>
      <ButtonContainer>

        <StyledImaged
          src={dislikeImage}
          alt="No me gusta"
          onClick={() => handleLike(false)}
          isClicked={isDislikeClicked}
        />


        <StyledImaged
          src={likeImage}
          alt="Me gusta"
          onClick={() => handleLike(true)}
          isClicked={isLikeClicked}
        />


      </ButtonContainer>
      <TabContainer>

      </TabContainer>
    </ImageTabWrapper>
  );
};

export default Sport;

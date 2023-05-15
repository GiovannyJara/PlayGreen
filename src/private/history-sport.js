import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import TabContainer from './tab-container';

import likeImage from '../assets/img/heart.png';
import dislikeImage from '../assets/img/dislike.png';
import { db } from './../public/firebase/firebase';



const Image = styled.img`
  width: 70%;
  height: auto;
  margin-bottom: 8px;
`;

const Like = styled.div`
  width: 20%;
  height: auto;
  margin-bottom: 8px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Type = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60%;
  padding: 8px;
  font-size: 20px;
  font-weight: bold;
  color: white;
  background-color: rgba(0, 0, 0, 0.5);
  margin: 0;
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  grid-gap: 16px;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: auto;
  position: relative; /* Agregado para establecer el contexto de posicionamiento */
`;

const ListItem = styled.li`
  position: relative;
  width: 100%;
  height: 15vh;
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: left;
  background-color:  ${props => props.theme.background};
  border-radius: 4px;
  padding: 16px;
  overflow: hidden;
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

const ImageTabWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const ButtonContainer = styled.div`
  flex: 0.2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:  ${props => props.theme.background};
`;

const History = () => {
  const [entries, setEntries] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (!dataLoaded) {
      const fetchData = async () => {
        const uid = localStorage.getItem('uid');
        try {
          const querySnapshot = await db.collection('playgreen-sports').doc(uid).collection("history").orderBy("timestamp", "desc").get();

          const entries = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              imageURL: data.imageURL,
              tags: data.tags,
              like: data.like
            };
          });

          setEntries(entries);
          setDataLoaded(true);
        } catch (error) {
          console.error(error);
        }
      };

      fetchData();
    }
  }, [dataLoaded]);

  return (
    <ImageTabWrapper>
      <ImageContainer>
        {entries.length === 0 ? (
          <p>Cargando...</p>
        ) : (
          <List>
            {entries.map((entry) => (
              <ListItem key={entry.id}>
                <Type>{entry.tags}</Type>
                <Image src={entry.imageURL} alt="Sports" />
                <Like>
                  {entry.like ? (
                    <img src={likeImage} alt="Like" />
                  ) : (
                    <img src={dislikeImage} alt="Dislike" />
                  )}
                </Like>
              </ListItem>
            ))}
          </List>
        )}
      </ImageContainer>
      <TabContainer />
    </ImageTabWrapper>
  );
};

export default History;
import React from 'react';
import styled from 'styled-components';
// import jack from '../Content/Images/jack.jpg';
// import dad from '../Content/Images/dad.jpg';
import mom from '../Content/Images/mom.jpg';
// import sue from '../Content/Images/sue.JPG';

const ABOUT_TEXT = `
This website is for my mom, who says cooking is like chemistry. 
This is a recipe sharing website and I hope to create a hub of how-to-cook 
knowledge that is as useful as asking my mom. If you have questions or want to add/edit a 
recipe please contact me or my mom. (contact page comming soon)`;

const AboutPage = styled.main`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const AboutText = styled.div`
  max-width: 40rem;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
  padding-right: 1rem;
  padding-left: 1rem;
`;

const AboutPictures = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin-top: 1rem;
`;

const PersonImage = styled.img`
  height: 30rem;
  width: auto;
`;

export default function About() {
  return (
    <AboutPage>
      <AboutText>{ABOUT_TEXT}</AboutText>
      <AboutPictures>
        {/* <PersonImage alt="Jack" src={jack} />
        <PersonImage alt="Dad" src={dad} />
        <PersonImage alt="Sue" src={sue} /> */}
        <PersonImage alt="Mom" src={mom} />
      </AboutPictures>
    </AboutPage>
  );
}

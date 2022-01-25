import { Box, Button, Text, TextField, Image } from '@skynexui/components';
import React from 'react';
import appConfig from '../config.json';

const GlobalStyle = () => {
  return (
    <style global jsx>{`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
      }
      body {
        font-family: 'Roboto', 'Open-Sans', sans-serif;
      }
      /* App fit Height */ 
      html, body, #__next {
        min-height: 100vh;
        display: flex;
        flex: 1;
      }
      #__next {
        flex: 1;
      }
      #__next > * {
        flex: 1;
      }
      /* ./App fit Height */ 
    `}</style>
  );
}

const Title = (props) => {
  const Tag = props.tag || 'h1';
  return (
    <div>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.primary[200]};
            font-size: 26px;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}


export default function PaginaInicial() {
  // const username = 'tomasfn87';
  const [username, setUsername] = React.useState("tomasfn87")
  const Link = `https://www.github.com/${username}`

  const Username = (username) => {
    let fUsername = ""

    if (username !== "") {
      fUsername += username[0].toUpperCase();

      for (let i=1; i < username.length; i++) {
        fUsername += username[i];
      }
    }

    return (
      <div>
        <a href={Link} target="_blank" rel="noreferrer">{fUsername}</a>
      </div>
    );
  }  

  return (
    <>
      <GlobalStyle />
      <Box
        styleSheet={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          backgroundColor: appConfig.theme.colors.primary[700],
          backgroundImage: 'url(https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)',
          backgroundRepeat: 'no-repeat', backgroundSize: '100vw', backgroundBlendMode: 'luminosity',
        }}
      >
        <Box
          styleSheet={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%', maxWidth: '700px',
            borderRadius: '5px', padding: '32px', margin: '16px',
            boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
            backgroundColor: appConfig.theme.colors.neutrals[700],
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            styleSheet={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              width: { xs: '100%', sm: '50%' }, textAlign: 'center', marginBottom: '32px',
            }}
          >
            <Title tag="h2">Boas vindas de volta!</Title>

            <Text variant="body3" styleSheet={{ marginBottom: '32px', color: appConfig.theme.colors.neutrals[300] }}>
              <a href="https://github.com/tomasfn87/next-aluracord" target="_blank" rel="noreferrer">
                {appConfig.name}
              </a>
            </Text>

            <TextField
            value={username}
              onChange={function (event) {
                const value = event.target.value;
                setUsername(value);
              }}
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.primary[200],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.primary[600],
                  backgroundColor: appConfig.theme.colors.neutrals[999],
                },
              }}
            />
            {/*<input
              type="text"
              value={username}
              onChange={function (event) {
                const value = event.target.value;
                setUsername(value);
              }}
            />*/}

            <Button
              type='submit'
              label='Entrar'
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: appConfig.theme.colors.primary[800],
                mainColorLight: appConfig.theme.colors.primary[700],
                mainColorStrong: appConfig.theme.colors.primary[700],
              }}
            />
          </Box>
          {/* Formulário */}


          {/* Photo Area */}
          <Box
            styleSheet={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              maxWidth: '220px',
              padding: '16px',
              backgroundColor: appConfig.theme.colors.neutrals[999],
              border: '0px solid',
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: '5px',
              flex: 1,
              minHeight: '270px',
            }}
          >
            <a href={Link}><Image
              styleSheet={{
                borderRadius: '2%',
                marginBottom: '16px',
              }}
              src={`https://github.com/${username}.png`} alt="foto do perfil do GitHub"
            /></a>
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[100],
                backgroundColor: appConfig.theme.colors.neutrals[800],
                padding: '3px 10px',
                borderRadius: '3px'
              }}
            >
              {Username(username)}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}

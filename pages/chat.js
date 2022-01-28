import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState, useEffect } from 'react';
import appConfig from '../config.json';
import { createClient } from '@supabase/supabase-js';
import sortObjectArrByProp from '../utils/sortObjectArrByProp';

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MzMwNzI2NiwiZXhwIjoxOTU4ODgzMjY2fQ.7mazx4nZWITbk95jtcFiSAkGPdQUF9Xn_Tbyza71bvI";
const SUPABASE_URL = "https://kymrratefurtiggevjps.supabase.co";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default function ChatPage() {
  const username = "tomasfn87";
  const [mensagem, setMensagem] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const newDate = new Date();
  const now = {
    date: { ptBR: newDate.toLocaleDateString('pt-BR').padStart(10, 0) },
    time: { ptBR: newDate.toLocaleTimeString('pt-BR').padStart(8, 0) },
    ms: newDate.getMilliseconds().toString().padStart(3, 0)
  }
  now.year = now.date.ptBR.slice(-4);
  now.month = now.date.ptBR.slice(3, 5);
  now.day = now.date.ptBR.slice(0, 2);

  useEffect(() => {
    supabase
    .from('messages')
    .select('*')
    .then(({ data }) => {
      setChatMessages(data);
    });
  }, [])

  const handleNewMessage = (newMessage) => {
    const mensagem = {
      texto: newMessage.trim(),
      de: username,
      id: `${now.year}/${now.month}/${now.day} ${now.time.ptBR}.${now.ms}`,
    }

    supabase
    .from('messages')
    .insert([ mensagem ])
    .then(({data}) => {
      !isStringEmpty(newMessage)
      || setChatMessages([ data[0], ...chatMessages ]);
    });
    setMensagem('');
  }

  const isStringEmpty = (text) => {
    if (text.length === 0) return false; 
    else {
      for (let i of text) {
        if (i !== " ") {
          return true;
        }
      }
      return false;
    }
  }

  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: 'url(https://images.pexels.com/photos/932638/pexels-photo-932638.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260)',
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'luminosity',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[900],
          height: '90%',
          maxWidth: '70%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[800],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList mensagens={chatMessages} />

          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              value={mensagem}
              onChange={(e) => setMensagem(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleNewMessage(mensagem);
                }
              }}
              placeholder="Digite sua mensagem"
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[999],
                marginRight: '12px',
                color: appConfig.theme.colors.primary[200],
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <div>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </Box>
    </div>
  )
}

function MessageList(props) {

  return (
    <Box
      id="message-list"
      tag="ul"
      styleSheet={{
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >

      {sortObjectArrByProp(props.mensagens, "id", "r").map((mensagem) => {
        return (
          <Text
            key={mensagem.id}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '6px',
              marginBottom: '12px',
              hover: {
                backgroundColor: appConfig.theme.colors.neutrals[700],
              }
            }}
          >
            <Box
              styleSheet={{
                marginBottom: '8px',
              }}
            >
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${mensagem.de}.png`}
                alt="GitHub profile picture"
              />
              <Text tag="strong">{mensagem.de}</Text>
              <Text
                styleSheet={{
                  fontSize: '12px',
                  marginLeft: '8px',
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {mensagem.id.slice(0, 19)}
              </Text>
            </Box>
            {mensagem.texto}
          </Text>
        )
      })}
    </Box>
  )
}

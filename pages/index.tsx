import { createStyles, Container, Text, TextInput, Button, MantineProvider, keyframes, Tooltip, MantineTheme } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { Link1Icon } from '@radix-ui/react-icons';
import type { NextPage } from 'next';
import Footer from '../components/Footer';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import axios from 'axios';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: ['500', '400', '900'],
  subsets: ['latin'],
});

const BREAKPOINT = 755;

const fadeOut = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0)',
  },

  to: {
    opacity: 0,
    transform: 'translateY(-20px)',
  },
});

const useStyles = createStyles((theme) => ({
  inner: {
    position: 'relative',
    paddingTop: useViewportSize().height / 3.1,
    [`@media (max-width: ${BREAKPOINT})`]: {
      paddingBottom: 80,
      paddingTop: 80,
    },
  },
  title: {
    fontFamily: poppins.style.fontFamily,
    fontSize: 62,
    fontWeight: 900,
    lineHeight: 1.1,
    textAlign: 'center',
    margin: 0,
    padding: 0,
    color: theme.white,

    [`@media (max-width: ${BREAKPOINT})`]: {
      fontSize: 42,
      lineHeight: 1.2,
    },
  },
  controls: {
    marginTop: theme.spacing.xl * 2,

    [`@media (max-width: ${BREAKPOINT})`]: {
      marginTop: theme.spacing.xl,
    },
  },
  notification: {
    animation: `${fadeOut} 2s forwards`,
  },
}));

const Home: NextPage = () => {
  const { classes } = useStyles();

  const [text, setText] = useState('');

  const [showCopy, setShowCopy] = useState(false);

  const [opened, setOpened] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setText(event.target.value);
    setShowCopy(false);
  }

  async function handleClick() {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/new`, { url: text });
      setText('https://testaus.link/' + response.data.short);
    } catch (error) {
      console.error(error);
    }

    setShowCopy(true);
  }

  function handleCopyToClipboard(): void {
    navigator.clipboard.writeText(text);

    setOpened((o) => !o);

    setTimeout(() => {
      setOpened((o) => !o);
    }, 200);
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && !showCopy) {
      handleClick();
    }
  };

  const buttonStyle = (theme: MantineTheme) => ({
    root: {
      backgroundColor: '#23bde7',
      fontFamily: poppins.style.fontFamily,
      fontSize: 16,
      fontWeight: 500,
      border: 0,
      paddingLeft: 20,
      paddingRight: 20,

      '&:hover': {
        backgroundColor: theme.fn.darken('#23bde7', 0.05),
      },

      marginLeft: 8
    },
  })

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles withNormalizeCSS>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          <Text component="a" href="https://testausserveri.fi" variant="gradient" gradient={{ from: '#8BBAFF', to: '#6CE5FF', deg: 65.61 }} inherit>
            testaus
          </Text>
          .link
        </h1>
        <div className={classes.controls} style={{ display: 'flex', alignItems: 'center' }}>
          <TextInput value={text} onChange={handleChange} onKeyDown={handleKeyDown} style={{ flex: 1 }} placeholder="Url" size="md" icon={<Link1Icon />} />
          <Tooltip classNames={{ tooltip: classes.notification }} opened={opened} label="Copied!">
            <Button
              styles={buttonStyle}
              size="md"
              onClick={showCopy ? handleCopyToClipboard : handleClick}
            >
              {showCopy ? 'Copy' : 'Create Shortlink'}
            </Button>
          </Tooltip>
          {showCopy ?
            <Button
              styles={buttonStyle}
              size="md"
              onClick={() => { setShowCopy(false); setText("") }}
            >
              New link
            </Button>
            : null}
        </div>
      </Container>
      <Footer></Footer>
    </MantineProvider>
  );
};

export default Home;

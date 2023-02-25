import { createStyles, Container, Text, Box, Anchor } from '@mantine/core';
import TestausserveriLogo from '../../public/testausserveri.svg';
import Image from 'next/image';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: ['500', '400', '900'],
  subsets: ['latin'],
});

const useStyles = createStyles((theme) => ({
  footer: {
    fontFamily: poppins.style.fontFamily,
    fontSize: 14,
    fontWeight: 400,
    marginTop: 220,
    borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
    position: 'fixed',
    bottom: 0,
    width: '100%',
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  logo: {
    fill: theme.colorScheme === 'dark' ? 'white' : 'black',
    opacity: '0.8',
    transition: 'opacity 0.2s !important',
    ':hover': {
      opacity: '1',
    },
  },
}));

export function Footer() {
  const { classes } = useStyles();

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <a href="https://testausserveri.fi">
          <Image src={TestausserveriLogo} className={classes.logo} height={60} alt="Testausserveri Logo" />
        </a>
        <Box>
          <Text>© {new Date().getFullYear()} Testausserveri ry & contributors</Text>
          <Text
            style={{ textDecoration: 'none', transition: 'text-decoration 0.3s' }}
            onMouseEnter={(event) => {
              event.currentTarget.style.textDecoration = 'underline';
            }}
            onMouseLeave={(event) => {
              event.currentTarget.style.textDecoration = 'none';
            }}
            component="a"
            href="https://github.com/Testausserveri/testaus.link"
            color="#23bde7"
          >
            Source code
          </Text>
        </Box>
      </Container>
    </div>
  );
}

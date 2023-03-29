import { createStyles, Title, Text, Button, Container, Group, MantineProvider } from '@mantine/core';
import type { NextPage } from 'next';
import { Poppins } from '@next/font/google';

const poppins = Poppins({
  weight: ['500', '400', '900'],
  subsets: ['latin'],
});

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 80,
    paddingBottom: 80,
  },

  label: {
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 220,
    lineHeight: 1,
    marginBottom: theme.spacing.xl * 1.5,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan('sm')]: {
      fontSize: 120,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: 'center',
    fontWeight: 900,
    fontSize: 38,

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },

  description: {
    maxWidth: 500,
    margin: 'auto',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.xl * 1.5,
  },
}));

const PageNotFound: NextPage = () => {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.label}>404</div>
      <Title className={classes.title}>Not found</Title>
      <Text color="dimmed" size="lg" align="center" className={classes.description}>
        Unfortunately, the page you requested was not found on this site. You may have mistyped the address, or the page may have been moved to another URL.
      </Text>
      <Group position="center">
        <Button component="a" href="/" variant="subtle" size="md">
          Take me back to the home page
        </Button>
      </Group>
    </Container>
  );
};

export default PageNotFound;

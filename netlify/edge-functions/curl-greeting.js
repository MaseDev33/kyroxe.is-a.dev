export default async (request, context) => {
  const userAgent = request.headers.get('user-agent') || '';

  if (userAgent.toLowerCase().includes('curl')) {
    return new Response(
      `+--------------------------------------+\n|  K   K  Y   Y  RRRR   OOO  X   X EEEEE |\n|  K  K   Y Y   R   R  O   O  X X  E     |\n|  KKK     Y    RRRR   O   O   X   EEEE  |\n|  K  K    Y    R R    O   O  X X  E     |\n|  K   K   Y    R  RR   OOO  X   X EEEEE |\n+--------------------------------------+\n\nHELLO FROM KYROXE\n=================\n\nI'm a 15-year-old developer and creator in Grade 11.\nI enjoy exploring code, designing digital spaces, and\nturning ideas into things you can click.\n\nABOUT\n-----\n  CODENAME   KYROXE\n  ROLE       DEVELOPER / CREATOR / EXPLORER\n  STATUS     LEARNING IN PUBLIC\n\nLINKS\n-----\n  WEBSITE    https://kyroxe.is-a.dev\n  EMAIL      me@kyroxe.is-a.dev\n\nThanks for stopping by! :3\n`,
      {
        headers: { 'content-type': 'text/plain; charset=utf-8' },
      },
    );
  }

  return context.next();
};
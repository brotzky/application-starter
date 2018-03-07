const getScripts = stats => {
  return Object.values(stats)
    .map(state => state[0])
    .map(obj => obj.file)
    .reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr);
      }
      return acc;
    }, [])
    .filter(
      filename => filename.includes('vendor') || filename.includes('client'),
    );
};

export default getScripts;

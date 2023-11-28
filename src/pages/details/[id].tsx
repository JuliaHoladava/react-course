import React from 'react';
import { useRouter } from 'next/router';
import Details from '../../components/Details/Details';

const DetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return <Details character={selectedCharacter} />;
};

export default DetailsPage;

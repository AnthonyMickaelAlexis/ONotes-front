import React from 'react';
import TeamCard from '../../components/TeamCard';
import GabrielAvatar from '../../assets/images/avatars/gabriel.png';
import HectorAvatar from '../../assets/images/avatars/hector.png';
import MickaelAvatar from '../../assets/images/avatars/mickael.png';
import XavierAvatar from '../../assets/images/avatars/xavier.svg';

import './team.scss';

function Team() {
  const teamMembers = [
    {
      image: GabrielAvatar,
      color: "#000AFF",
      name: "Gabriel",
      role: "Lead Costumier du Roi",
      description: "Je me présente, noble sujet des temps modernes, avec un esprit qui n'a d'égal que le plus brillant des diamants de la couronne royale. Tel un chevalier en quête d'une quête improbable, je navigue dans ce monde en quête de friandises exquises et de connaissances éternelles. Mon fidèle destrier n'est autre que mon destrier mécanique à quatre roues, et ma couronne est souvent remplacée par un chapeau de fantaisie des plus excentriques."
    },
    {
      image: HectorAvatar,
      color: "#45ba2d",
      name: "Hector",
      role: "Couteau suisse",
      description: "Mon rôle a été un peu comme celui d'un couteau suisse du développement, jonglant entre le front-end et le back-end. Gardien sur GitHub, veillant à ce que nos modifications se déroulent sans accroc. Rien de trop flamboyant, juste le travail nécessaire pour que tout fonctionne harmonieusement."
    },
    {
      image: MickaelAvatar,
      color: "#FFA800",
      name: "Mickaël",
      role: "Lead cassage de code sur scène",
      description: "Faites de la place sous les projecteurs, car voici Mickaël le lead développeur front-end et product owner qui ne se contente pas de pousser les limites du code, mais aussi celles de l'ampli! En journée, Il est le maestro de l'équipe de développement, jonglant avec Javascript et React.js. Sa philosophie? Si ça compile sans warning, c'est que tu peux coder encore plus dur."
    },
    {
      image: XavierAvatar,
      color: "#8c06b6",
      name: "Xavier",
      role: "Créateur de bugs",
      description: "Développeur front sur le projet O'Notes, Xavier s'est efforcé durant toute la période de développement à implémenter des bugs sournois afin de faire rager ses collègues. Mission accomplie !"
    },
  ];

  return (
    <div className='team-view'>
      <h1>L&apos;équipe derrière O&apos;Notes</h1>
      <div className='team-view-cards'>
        {teamMembers.map((member, index) => (
          <TeamCard
            key={`card-${index}`}
            image={member.image}
            color={member.color}
            name={member.name}
            role={member.role}
            description={member.description}
          />
        ))}
      </div>
    </div>
  );
}

export default Team;
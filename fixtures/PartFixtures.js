const mongoose = require('mongoose');
const Category = require('../models/Category');

async function getParts() {

  const categories = await Category.find();

  //console.log(categories);

  if (categories.length === 0) {
    console.error('Aucune catégorie trouvée. Veuillez d’abord insérer les catégories.');
    return;
  }

  const parts = [
    { name: 'Amortisseurs', reference: 'Part000001', category: categories[3]._id, provider: 'Fournisseur1' },
    { name: 'Rotule de direction', reference: 'Part000002', category: categories[3]._id, provider: 'Fournisseur1' },
    { name: 'Biellette de barre stabilisatrice', reference: 'Part000003', category: categories[3]._id, provider: 'Fournisseur1' },
    { name: 'Silent-bloc', reference: 'Part000004', category: categories[3]._id, provider: 'Fournisseur1' },
    { name: 'Roulement de roue', reference: 'Part000005', category: categories[3]._id, provider: 'Fournisseur1' },
    { name: 'Bras de suspension', reference: 'Part000006', category: categories[3]._id, provider: 'Fournisseur1' },
    { name: 'Disque de frein', reference: 'Part000007', category: categories[3]._id, provider: 'Fournisseur1' },
    { name: 'Plaquette de frein', reference: 'Part000008', category: categories[3]._id, provider: 'Fournisseur1' },
    { name: 'Étrier de frein', reference: 'Part000009', category: categories[3]._id, provider: 'Fournisseur1' },
    { name: 'Flexible de frein', reference: 'Part000010', category: categories[3]._id, provider: 'Fournisseur1' },
    { name: 'Maître-cylindre', reference: 'Part000011', category: categories[3]._id, provider: 'Fournisseur1' },
    { name: 'Courroie de distribution', reference: 'Part000012', category: categories[0]._id, provider: 'Fournisseur1' },
    { name: 'Chaîne de distribution', reference: 'Part000013', category: categories[0]._id, provider: 'Fournisseur1' },
    { name: 'Pompe à eau', reference: 'Part000014', category: categories[0]._id, provider: 'Fournisseur1' },
    { name: 'Joint de culasse', reference: 'Part000015', category: categories[0]._id, provider: 'Fournisseur1' },
    { name: 'Bougie d’allumage', reference: 'Part000016', category: categories[0]._id, provider: 'Fournisseur1' },
    { name: 'Bougie de préchauffage', reference: 'Part000017', category: categories[0]._id, provider: 'Fournisseur1' },
    { name: 'Injecteur', reference: 'Part000018', category: categories[0]._id, provider: 'Fournisseur1' },
    { name: 'Turbocompresseur', reference: 'Part000019', category: categories[0]._id, provider: 'Fournisseur1' },
    { name: 'Filtre à huile', reference: 'Part000020', category: categories[0]._id, provider: 'Fournisseur1' },
    { name: 'Filtre à air', reference: 'Part000021', category: categories[0]._id, provider: 'Fournisseur1' },
    { name: 'Culasse', reference: 'Part000022', category: categories[0]._id, provider: 'Fournisseur1' },
    { name: 'Radiateur moteur', reference: 'Part000023', category: categories[0]._id, provider: 'Fournisseur1' },
    { name: 'Huile moteur', reference: 'Part000024', category: categories[16]._id, provider: 'Fournisseur1' },
    { name: 'Joint de carter', reference: 'Part000025', category: categories[16]._id, provider: 'Fournisseur1' },
    { name: 'Thermostat', reference: 'Part000026', category: categories[16]._id, provider: 'Fournisseur1' },
    { name: 'Ventilateur de refroidissement', reference: 'Part000027', category: categories[16]._id, provider: 'Fournisseur1' },
    { name: 'Durite de radiateur', reference: 'Part000028', category: categories[16]._id, provider: 'Fournisseur1' },
    { name: 'Batterie', reference: 'Part000029', category: categories[1]._id, provider: 'Fournisseur1' },
    { name: 'Alternateur', reference: 'Part000030', category: categories[1]._id, provider: 'Fournisseur1' },
    { name: 'Démarreur', reference: 'Part000031', category: categories[1]._id, provider: 'Fournisseur1' },
    { name: 'Faisceau électrique', reference: 'Part000032', category: categories[1]._id, provider: 'Fournisseur1' },
    { name: 'Relais', reference: 'Part000033', category: categories[1]._id, provider: 'Fournisseur1' },
    { name: 'Fusible', reference: 'Part000034', category: categories[1]._id, provider: 'Fournisseur1' },
    { name: 'Capteur ABS', reference: 'Part000035', category: categories[1]._id, provider: 'Fournisseur1' },
    { name: 'Capteur PMH', reference: 'Part000036', category: categories[1]._id, provider: 'Fournisseur1' },
    { name: 'Bobine d’allumage', reference: 'Part000037', category: categories[1]._id, provider: 'Fournisseur1' },
    { name: 'Kit embrayage', reference: 'Part000038', category: categories[17]._id, provider: 'Fournisseur1' },
    { name: 'Butée d’embrayage', reference: 'Part000039', category: categories[17]._id, provider: 'Fournisseur1' },
    { name: 'Disque d’embrayage', reference: 'Part000040', category: categories[17]._id, provider: 'Fournisseur1' },
    { name: 'Volant moteur', reference: 'Part000041', category: categories[17]._id, provider: 'Fournisseur1' },
    { name: 'Cardan', reference: 'Part000042', category: categories[17]._id, provider: 'Fournisseur1' },
    { name: 'Soufflet de cardan', reference: 'Part000043', category: categories[17]._id, provider: 'Fournisseur1' },
    { name: 'Boîte de vitesses', reference: 'Part000044', category: categories[17]._id, provider: 'Fournisseur1' },
    { name: 'Boîte de transfert', reference: 'Part000045', category: categories[17]._id, provider: 'Fournisseur1' },
    { name: 'Joint spi', reference: 'Part000046', category: categories[17]._id, provider: 'Fournisseur1' },
    { name: 'Sélecteur de vitesse', reference: 'Part000047', category: categories[17]._id, provider: 'Fournisseur1' },
    { name: 'Compresseur de clim', reference: 'Part000048', category: categories[15]._id, provider: 'Fournisseur1' },
    { name: 'Condenseur', reference: 'Part000049', category: categories[15]._id, provider: 'Fournisseur1' },
    { name: 'Détendeur', reference: 'Part000050', category: categories[15]._id, provider: 'Fournisseur1' },
    { name: 'Pulseur d’air', reference: 'Part000051', category: categories[15]._id, provider: 'Fournisseur1' },
    { name: 'Résistance de ventilation', reference: 'Part000052', category: categories[15]._id, provider: 'Fournisseur1' },
    { name: 'Radiateur de chauffage', reference: 'Part000053', category: categories[15]._id, provider: 'Fournisseur1' },
    { name: 'Pare-chocs avant', reference: 'Part000054', category: categories[18]._id, provider: 'Fournisseur1' },
    { name: 'Pare-chocs arrière', reference: 'Part000055', category: categories[18]._id, provider: 'Fournisseur1' },
    { name: 'Capot', reference: 'Part000056', category: categories[18]._id, provider: 'Fournisseur1' },
    { name: 'Aile gauche', reference: 'Part000057', category: categories[18]._id, provider: 'Fournisseur1' },
    { name: 'Aile droite', reference: 'Part000058', category: categories[18]._id, provider: 'Fournisseur1' },
    { name: 'Rétroviseur gauche', reference: 'Part000059', category: categories[18]._id, provider: 'Fournisseur1' },
    { name: 'Rétroviseur droit', reference: 'Part000060', category: categories[18]._id, provider: 'Fournisseur1' },
    { name: 'Feux avant', reference: 'Part000061', category: categories[18]._id, provider: 'Fournisseur1' },
    { name: 'Feux arrière', reference: 'Part000062', category: categories[18]._id, provider: 'Fournisseur1' },
    { name: 'Siège conducteur', reference: 'Part000063', category: categories[14]._id, provider: 'Fournisseur1' },
    { name: 'Siège passager', reference: 'Part000064', category: categories[14]._id, provider: 'Fournisseur1' },
    { name: 'Ceinture de sécurité', reference: 'Part000065', category: categories[14]._id, provider: 'Fournisseur1' },
    { name: 'Tableau de bord', reference: 'Part000066', category: categories[14]._id, provider: 'Fournisseur1' },
    { name: 'Volant', reference: 'Part000067', category: categories[14]._id, provider: 'Fournisseur1' },
    { name: 'Pédale d’embrayage', reference: 'Part000068', category: categories[14]._id, provider: 'Fournisseur1' },
    { name: 'Pédale de frein', reference: 'Part000069', category: categories[14]._id, provider: 'Fournisseur1' },
    { name: 'Combiné d’instruments', reference: 'Part000070', category: categories[14]._id, provider: 'Fournisseur1' }
  ];

  return parts;
}

module.exports = getParts;



export type ChatLocale = 'en' | 'es' | 'pt';

export interface KnowledgeEntry {
  id: string;
  keywords: { en: string[]; es: string[]; pt: string[] };
  answer: { en: string; es: string; pt: string };
  link?: { en: string; es: string; pt: string };
}

export const knowledgeBase: KnowledgeEntry[] = [
  // === ABOUT THE COMPANY ===
  {
    id: 'about-history',
    keywords: {
      en: ['about', 'history', 'story', 'company', 'business', 'who', 'founded', 'started'],
      es: ['sobre', 'historia', 'empresa', 'quienes', 'fundada', 'inicio', 'negocio'],
      pt: ['sobre', 'historia', 'empresa', 'quem', 'fundada', 'inicio', 'negocio'],
    },
    answer: {
      en: 'Florida Fiberglass Pools was founded in 2013 with a simple mission: make premium fiberglass pools accessible to South Florida families. What began as a small operation now spans an 8,000 sqft showroom with 150+ pool styles on display, and we are the exclusive distributor for all of South Florida. We have delivered 1000+ pools and have 13+ years of experience.',
      es: 'Florida Fiberglass Pools fue fundada en 2013 con una misión simple: hacer accesibles las piscinas de fibra de vidrio premium para las familias del sur de Florida. Lo que comenzó como una pequeña operación ahora abarca un showroom de 8,000 sqft con más de 150 estilos de piscinas, y somos el distribuidor exclusivo para todo el sur de Florida. Hemos entregado más de 1000 piscinas y tenemos más de 13 años de experiencia.',
      pt: 'A Florida Fiberglass Pools foi fundada em 2013 com uma missão simples: tornar as piscinas de fibra de vidro premium acessíveis às famílias do sul da Flórida. O que começou como uma pequena operação agora abrange um showroom de 8.000 sqft com mais de 150 estilos de piscinas, e somos o distribuidor exclusivo para todo o sul da Flórida. Entregamos mais de 1000 piscinas e temos mais de 13 anos de experiência.',
    },
    link: {
      en: '/about',
      es: '/about',
      pt: '/about',
    },
  },
  {
    id: 'about-values',
    keywords: {
      en: ['values', 'quality', 'transparency', 'community', 'support', 'trust'],
      es: ['valores', 'calidad', 'transparencia', 'comunidad', 'soporte', 'confianza'],
      pt: ['valores', 'qualidade', 'transparencia', 'comunidade', 'suporte', 'confianca'],
    },
    answer: {
      en: 'We stand for four core values: Quality without compromise (we only install pools that meet our own standards), Transparent pricing (no hidden fees or surprise charges), Local roots and local service (we are a South Florida family business), and Lifetime support (we are here after installation for maintenance, warranty, and upgrades).',
      es: 'Defendemos cuatro valores fundamentales: Calidad sin compromiso (solo instalamos piscinas que cumplen nuestros propios estándares), Precios transparentes (sin tarifas ocultas ni cargos sorpresa), Raíces locales y servicio local (somos un negocio familiar del sur de Florida) y Soporte de por vida (estamos aquí después de la instalación para mantenimiento, garantía y mejoras).',
      pt: 'Defendemos quatro valores fundamentais: Qualidade sem compromisso (só instalamos piscinas que atendem aos nossos próprios padrões), Preços transparentes (sem taxas ocultas ou cobranças surpresa), Raízes locais e serviço local (somos um negócio familiar do sul da Flórida) e Suporte vitalício (estamos aqui após a instalação para manutenção, garantia e melhorias).',
    },
    link: {
      en: '/about',
      es: '/about',
      pt: '/about',
    },
  },
  {
    id: 'faq-why-flfg',
    keywords: {
      en: ['why choose flfg', 'why choose our pools', 'why florida fiberglass pools', 'american made', 'local builder support', 'exclusive distributor', '150 models', 'why choose fiberglass pools from flfg'],
      es: ['por que elegir flfg', 'por que elegir nuestras piscinas', 'por que florida fiberglass pools', 'fabricacion americana', 'soporte de constructores locales', 'distribuidor exclusivo', 'mas de 150 modelos', 'por que elegir nuestras piscinas de fibra de vidrio'],
      pt: ['por que escolher a flfg', 'por que escolher nossas piscinas', 'por que escolher as piscinas de fibra de vidro', 'por que florida fiberglass pools', 'fabricacao americana', 'suporte de construtores locais', 'distribuidor exclusivo', 'mais de 150 modelos'],
    },
    answer: {
      en: 'Our fiberglass pools combine American-made manufacturing, smooth comfort, attractive designs, and local builder support. As the exclusive distributor for South Florida, we offer 150+ models with designs that support modern outdoor living, easier maintenance, and a polished backyard experience — all backed by a lifetime structural warranty.',
      es: 'Nuestras piscinas combinan fabricación americana, comodidad, diseños atractivos y soporte de constructores locales. Como distribuidor exclusivo del sur de Florida, ofrecemos más de 150 modelos con diseños que apoyan el living exterior moderno, mantenimiento fácil y una experiencia de patio pulida — todo respaldado por una garantía estructural de por vida.',
      pt: 'Nossas piscinas de fibra de vidro combinam fabricação americana, conforto proporcionado pela superfície lisa, designs atraentes e suporte de construtores locais. Como distribuidor exclusivo para o Sul da Flórida, oferecemos mais de 150 modelos desenvolvidos para um estilo de vida moderno ao ar livre, manutenção mais fácil e uma experiência sofisticada no quintal — tudo respaldado por uma garantia estrutural vitalícia.',
    },
    link: {
      en: '/about',
      es: '/about',
      pt: '/about',
    },
  },
  {
    id: 'about-showroom',
    keywords: {
      en: ['showroom', 'visit', 'location', 'address', 'directions', 'display', 'store', 'place', 'get there', 'find', 'locate', 'see pools in person', 'view pools in person', 'showroom hours', 'showroom address'],
      es: ['showroom', 'visitar', 'ubicacion', 'locacion', 'lugar', 'direccion', 'ver piscinas', 'ver las piscinas en persona', 'ver piscinas en persona', 'tienda', 'local', 'como llego', 'como llegar', 'donde queda', 'horarios del showroom', 'direccion del showroom'],
      pt: ['showroom', 'visitar', 'localizacao', 'locacao', 'lugar', 'endereco', 'ver piscinas', 'ver as piscinas pessoalmente', 'ver piscinas pessoalmente', 'loja', 'local', 'como chego', 'onde fica', 'horarios do showroom', 'endereco do showroom'],
    },
    answer: {
      en: 'You can visit us to appreciate the quality of our products, colors, and more. is at 21500 S Dixie Hwy, Miami, FL 33189. Open Monday–Friday 9am–5pm, Saturday 9am–1pm, Sunday closed. Come see our pools in person!',
      es: 'Puedes visitarnos para apreciar la calidad de nuestros productos, colores y demas, está en 21500 S Dixie Hwy, Miami, FL 33189. Abierto lunes a viernes de 9am a 5pm, sábados de 9am a 1pm, domingos cerrado. ¡Ven a ver nuestras piscinas en persona!',
      pt: 'Nosso showroom de 8.000 sqft está em 21500 S Dixie Hwy, Miami, FL 33189. Aberto de segunda a sexta das 9h às 17h, sábados das 9h às 13h, domingos fechado. Venha ver nossas piscinas pessoalmente!',
    },
  },
  {
    id: 'about-service-area',
    keywords: {
      en: ['service', 'area', 'serve', 'delivery', 'coverage', 'counties', 'miami', 'broward', 'palm', 'beach', 'key', 'west', 'sarasota'],
      es: ['servicio', 'area', 'cubrimos', 'cobertura', 'condados', 'miami', 'broward', 'palm', 'beach', 'key', 'west', 'sarasota'],
      pt: ['servico', 'area', 'cobrimos', 'cobertura', 'condados', 'miami', 'broward', 'palm', 'beach', 'key', 'west', 'sarasota'],
    },
    answer: {
      en: 'across Indian River, St. Lucie,  Martin, Palm Beach, Broward, Miami-Dade, Monroe, Collier, Hendry, Glades, Lee, Charlotte, DeSoto, Hardee, Highlands and Okeechobee Counties. If you are outside these areas, call us and we will refer you to a trusted partner.',
      es: 'Servimos desde los condados de Hardee hasta Miami-Dade, Monroe hasta Saint Lucie, Palm Beach y Broward. Si estás fuera de estas áreas, llámanos y te referiremos a un socio de confianza.',
      pt: 'Atendemos desde os condados de Hardee a Miami-Dade, Monroe a Saint Lucie, Palm Beach e Broward. Se você estiver fora dessas áreas, ligue para nós e o encaminharemos a um parceiro de confiança.',
    },
  },

  // === FAQS ===
  {
    id: 'faq-fiberglass-different',
    keywords: {
      en: ['what makes fiberglass pools different', 'fiberglass', 'different', 'makes', 'unique', 'special'],
      es: ['que hace diferentes a las piscinas de fibra de vidrio', 'fibra', 'vidrio', 'diferente', 'hace', 'unico', 'especial'],
      pt: ['o que torna as piscinas de fibra de vidro diferentes', 'fibra', 'vidro', 'diferente', 'faz', 'unico', 'especial'],
    },
    answer: {
      en: 'Fiberglass pools are manufactured in Florida and designed for long-term backyard enjoyment. Each pool shell is built with consistent quality, a smooth fiberglass surface, and a selection of shapes that work for different homes. As the exclusive distributor for South Florida, we bring these premium pools directly to you.',
      es: 'Las piscinas de fibra de vidrio se fabrican en Florida y están diseñadas para el disfrute a largo plazo del patio. Cada casco de piscina se construye con calidad consistente, una superficie lisa de fibra de vidrio y una selección de formas que funcionan para diferentes hogares. Como distribuidor exclusivo del sur de Florida, le traemos estas piscinas premium directamente.',
      pt: 'As piscinas de fibra de vidro são fabricadas em Florida e projetadas para desfrute a longo prazo do quintal. Cada casco de piscina é construído com qualidade consistente, uma superfície lisa de fibra de vidro e uma seleção de formas que funcionam para diferentes lares. Como distribuidor exclusivo do sul da Flórida, trazemos essas piscinas premium diretamente para você.',
    },
    link: {
      en: '/info/faqs',
      es: '/info/faqs',
      pt: '/info/faqs',
    },
  },
  {
    id: 'faq-warranty',
    keywords: {
      en: ['what warranty do you offer', 'warranty', 'warranties', 'warrenty', 'warrantee', 'querrenty', 'guarantee', 'lifetime', 'structural', 'guaranty'],
      es: ['que garantia ofrecen', 'garantia', 'garantias', 'por vida', 'garantia estructural', 'que garantias existen', 'garantizar'],
      pt: ['que garantia voces oferecem', 'garantia', 'garantias', 'vitalicia', 'garantia estrutural', 'quais garantias existem', 'qual garantia oferecem', 'estrutural', 'garantir'],
    },
    answer: {
      en: 'Every fiberglass pool shell comes with a lifetime structural warranty directly from the factory.',
      es: 'Cada casco de piscina de fibra de vidrio viene con una garantía estructural de por vida directamente de la fábrica.',
      pt: 'Cada casco de piscina de fibra de vidro vem com uma garantia estrutural vitalícia diretamente da fábrica.',
    },
    link: {
      en: '/info/faqs',
      es: '/info/faqs',
      pt: '/info/faqs',
    },
  },
  {
    id: 'faq-installation-time',
    keywords: {
      en: ['installation', 'install', 'timeline', 'weeks', 'days', 'installation time', 'how long does installation take', 'how long to install'],
      es: ['instalacion', 'tiempo', 'tarda', 'proceso', 'semanas', 'dias', 'tiempo de instalacion', 'cuanto tarda la instalacion'],
      pt: ['instalacao', 'tempo', 'demora', 'processo', 'semanas', 'dias', 'tempo de instalacao', 'quanto tempo demora a instalacao'],
    },
    answer: {
      en: 'Most installations are typically completed in about 2 to 4 weeks once construction begins. The fiberglass shell itself is installed in one day. The overall timeline can vary based on permitting, weather, builder scheduling, excavation conditions, and surrounding patio work.',
      es: 'La mayoría de las instalaciones se completan típicamente en unas 2 a 4 semanas una vez que comienza la construcción. El casco de fibra de vidrio se instala en un día. El cronograma general puede variar según permisos, clima, programación del constructor, condiciones de excavación y trabajo del patio.',
      pt: 'A maioria das instalações é tipicamente concluída em cerca de 2 a 4 semanas após o início da construção. O casco de fibra de vidrio é instalado em um dia. O cronograma geral pode variar dependendo de permissões, clima, agendamento do construtor, condições de escavação e trabalho do pátio.',
    },
    link: {
      en: '/info/faqs',
      es: '/info/faqs',
      pt: '/info/faqs',
    },
  },
  {
    id: 'faq-maintenance',
    keywords: {
      en: ['maintenance', 'maintain', 'care', 'clean', 'upkeep', 'easy', 'maintain', 'are fiberglass pools easier to maintain'],
      es: ['mantenimiento', 'mantener', 'cuidado', 'limpiar', 'facil', 'son las piscinas de fibra de vidrio mas faciles de mantener'],
      pt: ['manutencao', 'manter', 'cuidado', 'limpar', 'facil', 'as piscinas de fibra de vidro sao mais faceis de manter'],
    },
    answer: {
      en: 'Yes, fiberglass pools are known for their smooth surface and simpler long-term care. The nonporous fiberglass surface helps reduce some of the upkeep commonly associated with other pool types, making everyday pool care more manageable.',
      es: 'Sí, las piscinas de fibra de vidrio son conocidas por su superficie lisa y cuidado a largo plazo más simple. La superficie no porosa de fibra de vidrio ayuda a reducir parte del mantenimiento comúnmente asociado con otros tipos de piscinas, haciendo que el cuidado diario sea más manejable.',
      pt: 'Sim, as piscinas de fibra de vidrio são conhecidas por sua superfície lisa e cuidado a longo prazo mais simples. A superfície não porosa de fibra de vidro ajuda a reduzir parte da manutenção comumente associada a outros tipos de piscinas, tornando o cuidado diário mais gerenciável.',
    },
    link: {
      en: '/info/pool-benefits',
      es: '/info/pool-benefits',
      pt: '/info/pool-benefits',
    },
  },
  {
    id: 'faq-fiberglass-vs-concrete',
    keywords: {
      en: ['concrete', 'vinyl', 'compare', 'comparison', 'difference', 'how do fiberglass pools compare to concrete pools', 'fiberglass vs concrete', 'fiberglass versus concrete', 'fiberglass vs vinyl'],
      es: ['concreto', 'comparar', 'comparacion', 'vinilo', 'diferencia', 'como se comparan las piscinas de fibra de vidrio con las de concreto', 'fibra vs concreto', 'fibra de vidrio vs concreto', 'fibra vs vinilo'],
      pt: ['concreto', 'comparar', 'comparacao', 'vinil', 'diferenca', 'como as piscinas de fibra de vidro se comparam as piscinas de concreto', 'fibra vs concreto', 'fibra de vidro vs concreto', 'fibra vs vinil'],
    },
    answer: {
      en: 'Fiberglass pools are manufactured as finished one-piece shells, while concrete pools are built on site. Fiberglass offers a smoother surface, streamlined installation, and lower-maintenance ownership. Concrete pools can offer more shape flexibility, but many homeowners choose fiberglass for comfort and ease of ownership. Fiberglass also installs faster (1 day for the shell vs weeks for concrete).',
      es: 'Las piscinas de fibra de vidrio se fabrican como cascos de una sola pieza terminados, mientras que las de concreto se construyen en el sitio. La fibra de vidrio ofrece una superficie más lisa, instalación más rápida y propiedad con menor mantenimiento. Las piscinas de concreto pueden ofrecer más flexibilidad de forma, pero muchos propietarios eligen fibra de vidrio por comodidad y facilidad de propiedad. La fibra de vidrio también se instala más rápido (1 día para el casco vs semanas para el concreto).',
      pt: 'As piscinas de fibra de vidro são fabricadas como cascos de uma única peça acabados, enquanto as de concreto são construídas no local. A fibra de vidro oferece uma superfície mais lisa, instalação mais rápida e propriedade com menor manutenção. As piscinas de concreto podem oferecer mais flexibilidade de forma, mas muitos proprietários escolhem fibra de vidro pelo conforto e facilidade de propriedade. A fibra de vidro também instala mais rápido (1 dia para o casco vs semanas para o concreto).',
    },
    link: {
      en: '/info/fiberglass-concrete',
      es: '/info/fiberglass-concrete',
      pt: '/info/fiberglass-concrete',
    },
  },
  {
    id: 'faq-customize',
    keywords: {
      en: ['customize', 'custom', 'personalize', 'options', 'upgrade', 'upgrades', 'tile', 'led', 'lighting', 'heater', 'can i customize my fiberglass pool'],
      es: ['personalizar', 'personalizado', 'opciones', 'mejorar', 'mejoras', 'azulejo', 'led', 'iluminacion', 'calentador', 'puedo personalizar mi piscina de fibra de vidrio'],
      pt: ['personalizar', 'personalizado', 'opcoes', 'melhorar', 'melhorias', 'azulejo', 'led', 'iluminacao', 'aquecedor', 'posso personalizar minha piscina de fibra de vidrio'],
    },
    answer: {
      en: 'The pool shell itself has a set factory-built shape, but the finished backyard can be personalized. Popular customization options include waterline tile, LED lighting, heaters or chillers, handrails, sanitation upgrades, water features, and expanded patio or outdoor living areas.',
      es: 'El casco de la piscina tiene una forma de fábrica fija, pero el patio terminado se puede personalizar. Las opciones populares de personalización incluyen azulejo de línea de agua, iluminación LED, calentadores o enfriadores, pasamanos, mejoras de saneamiento, características de agua y áreas expandidas de patio o vida al aire libre.',
      pt: 'O casco da piscina tem uma forma fixa de fábrica, mas o quintal acabado pode ser personalizado. As opções populares de personalização incluem azulejo de linha de água, iluminação LED, aquecedores ou resfriadores, corrimãos, melhorias de saneamento, recursos de água e áreas expandidas de pátio ou vida ao ar livre.',
    },
  },
  {
    id: 'faq-who-installs',
    keywords: {
      en: ['who installs your fiberglass pools', 'contractor', 'installer', 'certified', 'builder'],
      es: ['quien instala sus piscinas de fibra de vidrio', 'instala', 'contratista', 'instalador', 'certificado', 'constructor'],
      pt: ['quem instala as piscinas de fibra de vidro de voces', 'instala', 'contratista', 'instalador', 'certificado', 'construtor'],
    },
    answer: {
      en: 'We recommend one of our Certified Pool Contractors available for the area where your property is located. This gives you the benefit of a manufacturer-built pool shell while working with local professionals who understand permitting, excavation, soil conditions, and backyard construction in your area.',
      es: 'Recomendamos uno de nuestros Contratistas Certificados de Piscinas disponibles para el área donde se encuentra su propiedad. Esto le da el beneficio de un casco de piscina fabricado por el fabricante mientras trabaja con profesionales locales que entienden los permisos, excavación, condiciones del suelo y construcción de patio en su área.',
      pt: 'Recomendamos um dos nossos Contratistas Certificados de Piscinas disponível para a área onde sua propriedade está localizada. Isso lhe dá o benefício de um casco de piscina fabricado pelo fabricante enquanto trabalha com profissionais locais que entendem de permissões, escavação, condições do solo e construção de quintal em sua área.',
    },
  },
  {
    id: 'faq-permits',
    keywords: {
      en: ['permit', 'permits', 'permitting', 'code', 'building', 'regulations'],
      es: ['permiso', 'permisos', 'codigo', 'construccion', 'reglamentos'],
      pt: ['permiso', 'permisos', 'codigo', 'construcao', 'regulamentos'],
    },
    answer: {
      en: 'Yes, we handle all permits required by the counties we serve as part of the installation service.',
      es: 'Sí, manejamos todos los permisos requeridos por los condados que servimos como parte del servicio de instalación.',
      pt: 'Sim, cuidamos de todas as permissões exigidas pelos condados que servimos como parte do serviço de instalação.',
    },
  },
  {
    id: 'faq-financing',
    keywords: {
      en: ['do you offer financing', 'financing', 'finance', 'payment', 'monthly', 'loan', 'credit', 'hearth', 'hfs', 'afford'],
      es: ['ofrecen financiamiento', 'financiamiento', 'financiacion', 'pago', 'mensual', 'prestamo', 'credito', 'hfs', 'afordar'],
      pt: ['voces oferecem financiamento', 'financiamento', 'pagamento', 'mensal', 'emprestimo', 'credito', 'hfs', 'afordar'],
    },
    answer: {
      en: 'Yes, we partner with Hearth and HFS to offer monthly payment options. You can pre-qualify in minutes without affecting your credit score.',
      es: 'Sí, nos asociamos con Hearth y HFS para ofrecer opciones de pago mensual. Puede precalificarse en minutos sin afectar su puntaje crediticio.',
      pt: 'Sim, fazemos parceria com a Hearth e HFS para oferecer opções de pagamento mensal. Você pode pré-qualificar em minutos sem afetar seu score de crédito.',
    },
  },
  {
    id: 'faq-diy',
    keywords: {
      en: ['diy', 'do it yourself', 'do you offer a diy option', 'yourself', 'self', 'kit', 'homeowner'],
      es: ['diy', 'ofrecen una opcion diy', 'hazlo tu mismo', 'auto', 'kit', 'propietario'],
      pt: ['diy', 'oferecem uma opcao diy', 'faca voce mesmo', 'auto', 'kit', 'proprietario'],
    },
    answer: {
      en: "Yes, our 'Do It Yourself Kit' (DIY) includes the pool shell and all necessary equipment for you to install it yourself with a Home Owner Permit, or you can hire your own contractor. We can also add professional installation service with one of our Certified Pool Contractors if preferred.",
      es: "Sí, nuestro 'Kit Hazlo Tú Mismo' (DIY) incluye el casco de la piscina y todo el equipo necesario para que la instales tú mismo con un Permiso de Propietario, o puedes contratar a tu propio contratista. También podemos añadir servicio de instalación profesional con uno de nuestros Contratistas Certificados de Piscinas si lo prefieres.",
      pt: "Sim, nosso 'Kit Faça Você Mesmo' (DIY) inclui o casco da piscina e todo o equipamento necessário para você mesmo instalar com uma Permissão de Proprietário, ou você pode contratar seu próprio construtor. Também podemos adicionar serviço de instalação profissional com um dos nossos Contratistas Certificados de Piscinas se preferir.",
    },
  },
  {
    id: 'faq-rectangle',
    keywords: {
      en: ['rectangle', 'rectangular', 'modern', 'clean', 'lines', 'straight'],
      es: ['rectangulo', 'rectangular', 'moderno', 'limpio', 'lineas', 'rectas'],
      pt: ['retangulo', 'retangular', 'moderno', 'limpo', 'linhas', 'retas'],
    },
    answer: {
      en: 'Yes, rectangle fiberglass pools are a strong choice for homeowners who want a clean, timeless pool shape. Their straight lines work well with patios, outdoor kitchens, covered seating areas, screen enclosures, and modern landscape designs.',
      es: 'Sí, las piscinas rectangulares de fibra de vidrio son una excelente opción para los propietarios que desean una forma de piscina limpia y atemporal. Sus líneas rectas funcionan bien con patios, cocinas al aire libre, áreas de asiento cubiertas, recintos con pantalla y diseños de paisaje moderno.',
      pt: 'Sim, as piscinas retangulares de fibra de vidrio são uma excelente escolha para os proprietários que desejam uma forma de piscina limpa e atemporal. Suas linhas retas funcionam bem com pátios, cozinhas ao ar livre, áreas de assento cobertas, recintos com tela e designs de paisagem moderna.',
    },
    link: {
      en: '/products',
      es: '/products',
      pt: '/products',
    },
  },
  {
    id: 'faq-home-value',
    keywords: {
      en: ['home', 'home value', 'property', 'resale', 'increase', 'investment', 'worth'],
      es: ['valor', 'casa', 'propiedad', 'reventa', 'aumentar', 'inversion', 'vale'],
      pt: ['valor', 'casa', 'propriedade', 'revenda', 'aumentar', 'investimento', 'vale'],
    },
    answer: {
      en: 'A well-designed fiberglass pool can add appeal to a home, especially when it fits the property and outdoor living space. Rectangle pools are often attractive because they create a clean, organized backyard layout. The actual impact varies based on neighborhood, climate, pool condition, and local buyer demand.',
      es: 'Una piscina de fibra de vidrio bien diseñada puede agregar atractivo a una casa, especialmente cuando se ajusta a la propiedad y al espacio de vida al aire libre. Las piscinas rectangulares suelen ser atractivas porque crean un diseño de patio limpio y organizado. El impacto real varía según el vecindario, el clima, la condición de la piscina y la demanda local de compradores.',
      pt: 'Uma piscina de fibra de vidro bem projetada pode agregar apelo a uma casa, especialmente quando se ajusta à propriedade e ao espaço de vida ao ar livre. Piscinas retangulares costumam ser atraentes porque criam um layout de quintal limpo e organizado. O impacto real varia dependendo do bairro, clima, condição da piscina e demanda local de compradores.',
    },
  },

  // === PRODUCTS ===
  {
    id: 'products-pools',
    keywords: {
      en: ['pool', 'pools', 'models', 'catalog', 'styles', 'sizes', 'available', 'shapes'],
      es: ['piscina', 'piscinas', 'modelos', 'catalogo', 'estilos', 'tamaños', 'disponibles', 'formas'],
      pt: ['piscina', 'piscinas', 'modelos', 'catalogo', 'estilos', 'tamanhos', 'disponiveis', 'formas'],
    },
    answer: {
      en: 'We offer 15 fiberglass pool models (R1–R15) ranging from 14ft to 35ft in length. Shapes include rectangle, freeform, and beach-entry. Sizes range from compact (14ft) to large (35ft). We also have 3 spa models (Quatro, Cumba, Neblina) and 2 tanning ledge models (Natal Ledge, Rio Ledge). All are available in 7 colors: Bahama Blue, Caribbean Blue, Diamond Gray, Blue Abyss, Sky Blue, White Ivory, and Black Obsidian.',
      es: 'Ofrecemos 15 modelos de piscinas de fibra de vidrio (R1–R15) que van de 14 a 35 pies de largo. Las formas incluyen rectángulo, freeform y entrada de playa. Los tamaños van desde compacto (14 pies) hasta grande (35 pies). También tenemos 3 modelos de spa (Quatro, Cumba, Neblina) y 2 modelos de repisas para bronceado (Natal Ledge, Rio Ledge). Todos están disponibles en 7 colores: Bahama Blue, Caribbean Blue, Diamond Gray, Blue Abyss, Sky Blue, White Ivory y Black Obsidian.',
      pt: 'Oferecemos 15 modelos de piscinas de fibra de vidro (R1–R15) variando de 14 a 35 pés de comprimento. As formas incluem retângulo, freeform e entrada de praia. Os tamanhos variam de compacto (14 pés) a grande (35 pés). Também temos 3 modelos de spa (Quatro, Cumba, Neblina) e 2 modelos de plataformas de bronzeamento (Natal Ledge, Rio Ledge). Todos estão disponíveis em 7 cores: Bahama Blue, Caribbean Blue, Diamond Gray, Blue Abyss, Sky Blue, White Ivory e Black Obsidian.',
    },
    link: {
      en: '/products',
      es: '/products',
      pt: '/products',
    },
  },
  {
    id: 'products-spas',
    keywords: {
      en: ['spa', 'spas', 'hot', 'tub', 'hydrotherapy', 'jets', 'heated', 'relax'],
      es: ['spa', 'spas', 'hidroterapia', 'chorros', 'calefaccionado', 'relajacion'],
      pt: ['spa', 'spas', 'hidroterapia', 'jatos', 'aquecido', 'relaxamento'],
    },
    answer: {
      en: 'We offer 3 fiberglass spa models: Quatro (8\'×8\', 800 gallons), Cumba (8\'×8\', 800 gallons), and Neblina (8\'×10\', 950 gallons). All feature hydrotherapy jets, heated design, standalone or add-on options, and year-round use capability.',
      es: 'Ofrecemos 3 modelos de spa de fibra de vidrio: Quatro (8\'×8\', 800 galones), Cumba (8\'×8\', 800 galones) y Neblina (8\'×10\', 950 galones). Todos cuentan con chorros de hidroterapia, diseño calefaccionado, opciones independientes o complementarias y capacidad de uso durante todo el año.',
      pt: 'Oferecemos 3 modelos de spa de fibra de vidro: Quatro (8\'×8\', 800 galões), Cumba (8\'×8\', 800 galões) e Neblina (8\'×10\', 950 galões). Todos contam com jatos de hidroterapia, design aquecido, opções independente ou complementar e capacidade de uso durante todo o ano.',
    },
    link: {
      en: '/products?size=spa',
      es: '/products?size=spa',
      pt: '/products?size=spa',
    },
  },
  {
    id: 'products-ledges',
    keywords: {
      en: ['ledge', 'tanning', 'shelf', 'shallow', 'lounging', 'beach', 'entry'],
      es: ['repisa', 'bronceado', 'plataforma', 'poco', 'profundo', 'entrada', 'playa'],
      pt: ['plataforma', 'bronzeamento', 'raso', 'pouco', 'profundo', 'entrada', 'praia'],
    },
    answer: {
      en: 'We offer 2 tanning ledge models: Natal Ledge (8\'×8\', 10" deep, 250 gallons) and Rio Ledge (8\'×10\', 10" deep, 400 gallons). Perfect for shallow water relaxation and lounging. They can be standalone or add-on to a pool.',
      es: 'Ofrecemos 2 modelos de repisas para bronceado: Natal Ledge (8\'×8\', 10" de profundidad, 250 galones) y Rio Ledge (8\'×10\', 10" de profundidad, 400 galones). Perfectas para relajación en agua poco profunda. Pueden ser independientes o complemento de una piscina.',
      pt: 'Oferecemos 2 modelos de plataformas de bronzeamento: Natal Ledge (8\'×8\', 10" de profundidade, 250 galões) e Rio Ledge (8\'×10\', 10" de profundidade, 400 galões). Perfeitas para relaxamento em água rasa. Podem ser independentes ou complemento de uma piscina.',
    },
    link: {
      en: '/products?size=ledge',
      es: '/products?size=ledge',
      pt: '/products?size=ledge',
    },
  },
  {
    id: 'products-colors',
    keywords: {
      en: ['color', 'colors', 'gelcoat', 'finish', 'water', 'blue', 'gray', 'white', 'black'],
      es: ['color', 'colores', 'gelcoat', 'acabado', 'agua', 'azul', 'gris', 'blanco', 'negro'],
      pt: ['cor', 'cores', 'gelcoat', 'acabamento', 'agua', 'azul', 'cinza', 'branco', 'preto'],
    },
    answer: {
      en: 'We offer 7 pool colors: Bahama Blue, Caribbean Blue, Diamond Gray, Blue Abyss, Sky Blue, White Ivory, and Black Obsidian. Each color creates a different water effect and aesthetic for your backyard.',
      es: 'Ofrecemos 7 colores de piscina: Bahama Blue, Caribbean Blue, Diamond Gray, Blue Abyss, Sky Blue, White Ivory y Black Obsidian. Cada color crea un efecto de agua y estética diferente para su patio.',
      pt: 'Oferecemos 7 cores de piscina: Bahama Blue, Caribbean Blue, Diamond Gray, Blue Abyss, Sky Blue, White Ivory e Black Obsidian. Cada cor cria um efeito de água e estética diferente para o seu quintal.',
    },
  },
  {
    id: 'products-features',
    keywords: {
      en: ['features', 'standard', 'included', 'equipment', 'non-slip', 'salt', 'led', 'heater', 'compatible'],
      es: ['caracteristicas', 'estandar', 'incluido', 'equipo', 'antideslizante', 'sal', 'led', 'calentador', 'compatible'],
      pt: ['caracteristicas', 'padrao', 'incluido', 'equipamento', 'antiderrapante', 'sal', 'led', 'aquecedor', 'compativel'],
    },
    answer: {
      en: 'Standard features on all our pools include: non-slip steps, salt system ready, LED-ready, and heater compatible. Beach entry models also include beach entry and tanning ledge. Freeform models include freeform design. Large pools (22ft+) include spillover spa option.',
      es: 'Las características estándar en todas nuestras piscinas incluyen: escalones antideslizantes, lista para sistema de sal, listo para LED y compatible con calentador. Los modelos de entrada de playa también incluyen entrada de playa y repisa para bronceado. Los modelos freeform incluyen diseño de forma libre. Las piscinas grandes (22ft+) incluyen opción de spa con derrame.',
      pt: 'Os recursos padrão em todas as nossas piscinas incluem: degraus antiderrapantes, pronta para sistema de sal, pronto para LED e compatível com aquecedor. Os modelos de entrada de praia também incluem entrada de praia e plataforma de bronzeamento. Os modelos freeform incluem design de forma livre. As piscinas grandes (22ft+) incluem opção de spa com transbordamento.',
    },
  },

  // === SPECIFIC MODEL QUERIES ===
  {
    id: 'products-specific-model',
    keywords: {
      en: ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15', 'rs1', 'rs2', 'rs3', 'rl1', 'rl2', 'neblina', 'cali', 'costa', 'colombian', 'roatan', 'brasilia', 'belize', 'nova', 'solaris', 'quatro', 'cumba', 'natal', 'rio', 'details', 'specs', 'specifications', 'dimensions'],
      es: ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15', 'rs1', 'rs2', 'rs3', 'rl1', 'rl2', 'neblina', 'cali', 'costa', 'colombian', 'roatan', 'brasilia', 'belize', 'nova', 'solaris', 'quatro', 'cumba', 'natal', 'rio', 'detalles', 'especificaciones', 'dimensiones'],
      pt: ['r1', 'r2', 'r3', 'r4', 'r5', 'r6', 'r7', 'r8', 'r9', 'r10', 'r11', 'r12', 'r13', 'r14', 'r15', 'rs1', 'rs2', 'rs3', 'rl1', 'rl2', 'neblina', 'cali', 'costa', 'colombian', 'roatan', 'brasilia', 'belize', 'nova', 'solaris', 'quatro', 'cumba', 'natal', 'rio', 'detalhes', 'especificacoes', 'dimensoes'],
    },
    answer: {
      en: "You can see all details, specifications, dimensions, colors, and photos for each model on our products page. Browse our catalog of 15 pool models (R1–R15), 3 spas (RS1–RS3), and 2 tanning ledges (RL1–RL2). Each model page includes full specs, images, and available colors.",
      es: 'Puedes ver todos los detalles, especificaciones, dimensiones, colores y fotos de cada modelo en nuestra página de productos. Explora nuestro catálogo de 15 modelos de piscinas (R1–R15), 3 spas (RS1–RS3) y 2 repisas para bronceado (RL1–RL2). Cada página de modelo incluye especificaciones completas, imágenes y colores disponibles.',
      pt: 'Você pode ver todos os detalhes, especificações, dimensões, cores e fotos de cada modelo em nossa página de produtos. Navegue nosso catálogo de 15 modelos de piscinas (R1–R15), 3 spas (RS1–RS3) e 2 plataformas de bronzeamento (RL1–RL2). Cada página de modelo inclui especificações completas, imagens e cores disponíveis.',
    },
    link: {
      en: '/products',
      es: '/products',
      pt: '/products',
    },
  },

  // === INFO PAGES ===
  {
    id: 'info-benefits',
    keywords: {
      en: ['benefits', 'advantages', 'pros', 'smooth', 'durable', 'low maintenance', 'benefits of fiberglass', 'why choose fiberglass'],
      es: ['beneficios', 'ventajas', 'liso', 'duradero', 'bajo mantenimiento', 'beneficios de fibra de vidrio', 'por que elegir fibra de vidrio'],
      pt: ['beneficios', 'vantagens', 'liso', 'duravel', 'baixa manutencao', 'beneficios da fibra de vidro', 'por que escolher fibra de vidro'],
    },
    answer: {
      en: 'Key benefits of fiberglass pools: low maintenance (smooth nonporous surface), built-in features (non-slip steps, salt system ready), faster installation (shell installed in 1 day), durability (lifetime structural warranty), and lower lifetime cost of ownership compared to concrete or vinyl.',
      es: 'Beneficios clave de las piscinas de fibra de vidrio: bajo mantenimiento (superficie lisa no porosa), características integradas (escalones antideslizantes, lista para sistema de sal), instalación más rápida (casco instalado en 1 día), durabilidad (garantía estructural de por vida) y menor costo de propiedad a largo plazo en comparación con concreto o vinilo.',
      pt: 'Principais benefícios das piscinas de fibra de vidro: baixa manutenção (superfície lisa não porosa), recursos integrados (degraus antiderrapantes, pronta para sistema de sal), instalação mais rápida (casco instalado em 1 dia), durabilidade (garantia estrutural vitalícia) e menor custo de propriedade a longo prazo em comparação com concreto ou vinil.',
    },
    link: {
      en: '/info/pool-benefits',
      es: '/info/pool-benefits',
      pt: '/info/pool-benefits',
    },
  },
  {
    id: 'info-pricing',
    keywords: {
      en: ['price', 'pricing', 'cost', 'expensive', 'budget', 'estimate', 'pool prices', 'how much does a pool cost', 'how much does a pool cost'],
      es: ['precio', 'precios', 'costo', 'cuesta', 'caro', 'presupuesto', 'estimado', 'precios de piscinas', 'cuanto cuesta una piscina'],
      pt: ['preco', 'precos', 'custo', 'custa', 'caro', 'orcamento', 'estimado', 'precos de piscinas', 'quanto custa uma piscina'],
    },
    answer: {
      en: 'Fiberglass pool project costs vary based on scope, size, site conditions, and customization. Key factors include pool size, site access, electrical/plumbing, patio decking, permits, and optional upgrades like LED lighting, heaters, or water features. For accurate pricing, we recommend requesting a free quote. We also offer financing through Hearth and HFS with monthly payment options.',
      es: 'Los costos del proyecto de piscina de fibra de vidrio varían según el alcance, tamaño, condiciones del sitio y personalización. Los factores clave incluyen tamaño de la piscina, acceso al sitio, electricidad/plomería, patio, permisos y mejoras opcionales como iluminación LED, calentadores o características de agua. Para precios precisos, recomendamos solicitar una cotización gratis. También ofrecemos financiamiento a través de Hearth y HFS con opciones de pago mensual.',
      pt: 'Os custos do projeto de piscina de fibra de vidro variam conforme o escopo, tamanho, condições do local e personalização. Os fatores principais incluem tamanho da piscina, acesso ao local, eletricidade/encanamento, pátio, permissões e melhorias opcionais como iluminação LED, aquecedores ou recursos de água. Para preços precisos, recomendamos solicitar um orçamento gratuito. Também oferecemos financiamento através da Hearth e HFS com opções de pagamento mensal.',
    },
    link: {
      en: '/info/pool-pricing-guide',
      es: '/info/pool-pricing-guide',
      pt: '/info/pool-pricing-guide',
    },
  },

  // === CONTACT / CTA ===
  {
    id: 'contact-phone',
    keywords: {
      en: ['phone', 'call', 'number', 'contact', 'reach', 'contact phone', 'phone number', 'how can I contact you'],
      es: ['telefono', 'llamar', 'numero', 'contacto', 'numero de telefono', 'como puedo contactarlos'],
      pt: ['telefone', 'ligar', 'numero', 'contato', 'numero de telefone', 'como posso entrar em contato'],
    },
    answer: {
      en: 'You can reach us at 786-207-1634. We are available Monday–Friday 9am–5pm and Saturday 9am–1pm.',
      es: 'Puedes contactarnos al 786-207-1634. Estamos disponibles de lunes a viernes de 9am a 5pm y sábados de 9am a 1pm.',
      pt: 'Você pode nos contatar pelo 786-207-1634. Estamos disponíveis de segunda a sexta das 9h às 17h e sábados das 9h às 13h.',
    },
  },
  {
    id: 'contact-whatsapp',
    keywords: {
      en: ['whatsapp', 'message', 'text', 'chat'],
      es: ['whatsapp', 'mensaje', 'texto', 'chat'],
      pt: ['whatsapp', 'mensagem', 'texto', 'chat'],
    },
    answer: {
      en: 'You can WhatsApp us at +1 (786) 207-1634. We respond during business hours.',
      es: 'Puedes escribirnos por WhatsApp al +1 (786) 207-1634. Respondemos durante el horario comercial.',
      pt: 'Você pode nos enviar WhatsApp para +1 (786) 207-1634. Respondemos durante o horário comercial.',
    },
  },
  {
    id: 'contact-email',
    keywords: {
      en: ['email', 'mail', 'sales@', 'inbox'],
      es: ['correo', 'email', 'correo', 'electronico'],
      pt: ['email', 'correo', 'eletronico'],
    },
    answer: {
      en: 'You can email us at sales@flfgpools.com for quotes, questions, or any inquiries.',
      es: 'Puedes escribirnos a sales@flfgpools.com para cotizaciones, preguntas o cualquier consulta.',
      pt: 'Você pode nos enviar email para sales@flfgpools.com para orçamentos, perguntas ou qualquer consulta.',
    },
  },
  {
    id: 'contact-quote',
    keywords: {
      en: ['quote', 'free', 'consultation', 'estimate', 'request', 'form', 'design', 'configure'],
      es: ['cotizacion', 'gratis', 'consulta', 'estimado', 'solicitar', 'formulario', 'disenar', 'configurar'],
      pt: ['cotacao', 'gratis', 'consulta', 'orcamento', 'solicitar', 'formulario', 'projetar', 'configurar'],
    },
    answer: {
      en: 'You can request a free quote through our contact page or use our "Create by Yourself" tool to configure your pool model, size, color, and extras. Our team will get back to you with a design direction and pricing.',
      es: 'Puedes solicitar una cotización gratis a través de nuestra página de contacto o usar nuestra herramienta "Crea tu Piscina" para configurar tu modelo, tamaño, color y extras. Nuestro equipo te responderá con una dirección de diseño y precios.',
      pt: 'Você pode solicitar um orçamento gratuito através da nossa página de contato ou usar nossa ferramenta "Crie sua Piscina" para configurar seu modelo, tamanho, cor e extras. Nossa equipe responderá com uma direção de design e preços.',
    },
    link: {
      en: '/contact',
      es: '/contact',
      pt: '/contact',
    },
  },

  // === CONVERSATIONAL — GREETINGS ===
  {
    id: 'greeting-hello',
    keywords: {
      en: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'sup', 'whats up'],
      es: ['hola', 'buenas', 'buenos dias', 'buenas tardes', 'buenas noches', 'que tal', 'saludos', 'oye', 'ola'],
      pt: ['ola', 'oi', 'bom dia', 'boa tarde', 'boa noite', 'opa', 'eai', 'salve'],
    },
    answer: {
      en: "Hello! Welcome to Florida Fiberglass Pools. I'm here to help with any questions about our pools, spas, ledges, pricing, or company. How can I assist you?",
      es: '¡Hola! Bienvenido a Florida Fiberglass Pools. Estoy aquí para ayudarte con cualquier pregunta sobre nuestras piscinas, spas, repisas, precios o empresa. ¿En qué puedo ayudarte?',
      pt: 'Olá! Bem-vindo à Florida Fiberglass Pools. Estou aqui para ajudar com qualquer pergunta sobre nossas piscinas, spas, plataformas, preços ou empresa. Como posso ajudar?',
    },
  },
  {
    id: 'greeting-how-are-you',
    keywords: {
      en: ['how', 'are', 'you', 'doing', 'whats up', 'how is it going'],
      es: ['como', 'estas', 'que', 'tal', 'como', 'va', 'como', 'te', 'va'],
      pt: ['como', 'vai', 'como', 'esta', 'tudo', 'bem'],
    },
    answer: {
      en: "I'm doing great, thanks for asking! I'm ready to help you with any questions about our fiberglass pools, spas, ledges, or company info. What would you like to know?",
      es: '¡Muy bien, gracias por preguntar! Estoy listo para ayudarte con cualquier pregunta sobre nuestras piscinas de fibra de vidrio, spas, repisas o información de la empresa. ¿Qué te gustaría saber?',
      pt: 'Vou muito bem, obrigado por perguntar! Estou pronto para ajudar com qualquer pergunta sobre nossas piscinas de fibra de vidro, spas, plataformas ou informações da empresa. O que você gostaria de saber?',
    },
  },

  // === CONVERSATIONAL — FAREWELLS ===
  {
    id: 'farewell-bye',
    keywords: {
      en: ['bye', 'goodbye', 'see you', 'later', 'thanks bye', 'that', 'all', 'good', 'thanks', 'help'],
      es: ['adios', 'chao', 'hasta', 'luego', 'nos', 'vemos', 'gracias', 'adios', 'eso', 'todo', 'gracias', 'ayuda'],
      pt: ['tchau', 'ate', 'logo', 'ate', 'mais', 'obrigado', 'valeu', 'isso', 'tudo', 'obrigado', 'ajuda'],
    },
    answer: {
      en: "You're welcome! If you have more questions, just open the chat again. You can also call us at 786-207-1634 or visit our contact page. Have a great day!",
      es: '¡De nada! Si tienes más preguntas, solo abre el chat de nuevo. También puedes llamarnos al 786-207-1634 o visitar nuestra página de contacto. ¡Que tengas un gran día!',
      pt: 'De nada! Se você tiver mais perguntas, basta abrir o chat novamente. Você também pode nos ligar em 786-207-1634 ou visitar nossa página de contato. Tenha um ótimo dia!',
    },
  },

  // === CONVERSATIONAL — THANKS ===
  {
    id: 'thanks',
    keywords: {
      en: ['thanks', 'thank', 'you', 'appreciate', 'helpful', 'great', 'awesome', 'perfect'],
      es: ['gracias', 'agradezco', 'util', 'genial', 'perfecto', 'muy', 'amable'],
      pt: ['obrigado', 'agradeco', 'util', 'otimo', 'perfeito', 'muito', 'obrigado'],
    },
    answer: {
      en: "You're very welcome! Is there anything else I can help you with about our pools, spas, or company?",
      es: '¡De nada! ¿Hay algo más en lo que pueda ayudarte sobre nuestras piscinas, spas o empresa?',
      pt: 'De nada! Há mais alguma coisa em que eu possa ajudar sobre nossas piscinas, spas ou empresa?',
    },
  },

  // === CONVERSATIONAL — COMMON PHRASES ===
  {
    id: 'phrase-i-would-like-to-know',
    keywords: {
      en: ['i', 'would', 'like', 'know', 'wondering', 'curious', 'tell', 'me', 'about', 'info', 'information'],
      es: ['me', 'gustaria', 'saber', 'quisiera', 'saber', 'dime', 'informacion', 'información', 'cuéntame', 'cuentame', 'fijate', 'fíjate', 'oye', 'mira', 'necesito', 'saber'],
      pt: ['eu', 'gostaria', 'saber', 'gostaria', 'saber', 'me', 'diga', 'informacao', 'informação', 'preciso', 'saber', 'olha', 'veja', 'bem'],
    },
    answer: {
      en: "Sure! I can help with that. I have information about our pool models, spas, tanning ledges, pricing, installation, warranties, financing, and company details. What specifically would you like to know?",
      es: '¡Claro! Puedo ayudarte con eso. Tengo información sobre nuestros modelos de piscinas, spas, repisas para bronceado, precios, instalación, garantías, financiamiento y detalles de la empresa. ¿Qué te gustaría saber específicamente?',
      pt: 'Claro! Posso ajudar com isso. Tenho informações sobre nossos modelos de piscinas, spas, plataformas de bronzeamento, preços, instalação, garantias, financiamento e detalhes da empresa. O que especificamente você gostaria de saber?',
    },
  },
  {
    id: 'phrase-can-you-help',
    keywords: {
      en: ['can', 'you', 'help', 'need', 'help', 'question', 'assist', 'support'],
      es: ['puedes', 'ayudar', 'necesito', 'ayuda', 'pregunta', 'asistencia', 'soporte', 'ayudame', 'ayúdame'],
      pt: ['pode', 'ajudar', 'preciso', 'ajuda', 'pergunta', 'assistencia', 'suporte', 'me', 'ajuda'],
    },
    answer: {
      en: "Of course! I'm here to help. I can answer questions about our fiberglass pools, spas, ledges, pricing, installation, warranties, company info, and more. What's your question?",
      es: '¡Por supuesto! Estoy aquí para ayudarte. Puedo responder preguntas sobre nuestras piscinas de fibra de vidrio, spas, repisas, precios, instalación, garantías, información de la empresa y más. ¿Cuál es tu pregunta?',
      pt: 'Claro! Estou aqui para ajudar. Posso responder perguntas sobre nossas piscinas de fibra de vidro, spas, plataformas, preços, instalação, garantias, informações da empresa e mais. Qual é sua pergunta?',
    },
  },
  {
    id: 'phrase-yes-no-maybe',
    keywords: {
      en: ['yes', 'yeah', 'yep', 'sure', 'ok', 'okay', 'sounds good', 'no', 'nope', 'maybe', 'not sure'],
      es: ['si', 'sí', 'claro', 'ok', 'vale', 'esta bien', 'está bien', 'no', 'quizas', 'quizás', 'no estoy seguro'],
      pt: ['sim', 'claro', 'ok', 'tudo bem', 'nao', 'nao', 'talvez', 'nao', 'tenho', 'certeza'],
    },
    answer: {
      en: "Great! Feel free to ask me anything about our pools, spas, ledges, pricing, installation, or company. I'm here to help!",
      es: '¡Genial! No dudes en preguntarme cualquier cosa sobre nuestras piscinas, spas, repisas, precios, instalación o empresa. ¡Estoy aquí para ayudarte!',
      pt: 'Ótimo! Sinta-se à vontade para me perguntar qualquer coisa sobre nossas piscinas, spas, plataformas, preços, instalação ou empresa. Estou aqui para ajudar!',
    },
  },
];

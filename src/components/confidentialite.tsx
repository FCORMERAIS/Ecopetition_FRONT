export default function PrivacyContent() {
    return (
      <div>
        <h2 className="text-xl font-bold mb-6 text-center">ÉcoPétition</h2>
        <br/>
        <section className="mb-6">
          <h3 className="font-semibold mt-4 text-center">ARTICLE 1 : PRÉAMBULE</h3>
          <br/>
          <p className="text-left">
            Cette politique de confidentialité informe les utilisateurs sur :
          </p>
          <p>
            La collecte de données personnelles (noms, prénoms, emails, localisation, IP, etc.).
            Leurs droits concernant ces données.
            Le responsable du traitement des données.
            Les destinataires des données collectées.
            La politique en matière de cookies.
          </p>
        <br/>
        </section>
        <section className="mb-6">
          <h3 className="font-semibold mt-4 text-center">ARTICLE 2 : PRINCIPES DE COLLECTE ET TRAITEMENT</h3>
          <br/>
          <p>Les données personnelles sont :</p>
          <p>
            Collectées de manière licite, loyale et transparente.<br/>
            Utilisées à des fins déterminées, explicites et légitimes.<br/>
            Pertinentes et limitées aux besoins des traitements.<br/>
            Exactes et régulièrement mises à jour.<br/>
            Conservées pour une durée nécessaire aux finalités.<br/>
            Traitées en garantissant leur sécurité.<br/>
          </p>
          <br/>
          <p>Le traitement est licite si l'une des conditions suivantes est remplie :</p>
          <p className="list-disc list-inside ml-4">
            Consentement explicite de la personne concernée.
            Nécessité pour l'exécution d'un contrat ou d'obligations légales.
            Protection des intérêts vitaux ou mission d'intérêt public.
            Intérêts légitimes du responsable du traitement, sauf si les droits fondamentaux prévalent.
          </p>
          <br/>
        </section>
  
        <section className="mb-6">
          <h3 className="font-semibold mt-4 text-center">ARTICLE 3 : DONNÉES COLLECTÉES</h3>
          <br/>
          <p>Les données collectées sont :</p>
          <br/>
          <ul>
            <li>Login</li>
            <li>Mot de passe</li>
          </ul>
          <br/>
          <p>Objectifs de cette collecte :</p>
          <br/>
          <ul>
          <li>Identification</li>
          <li>Connexion des utilisateurs</li>
          </ul>
          <br/>
        </section>
  
        <section>
          <h3 className="font-semibold mt-4 text-center">ARTICLE 4 : MODIFICATION DE LA POLITIQUE</h3>
          <p>
          <br/>
            ÉcoPétition se réserve le droit de modifier cette politique à tout moment.  
            Les changements s'appliqueront uniquement aux interactions postérieures à la modification.  
            L'utilisateur est invité à consulter régulièrement cette politique.
          </p>
          <br/>
          <p>
            <strong>Dernière mise à jour :</strong> 14/03/2025.
          </p>
        </section>
        <style jsx>{`
        p{
        text-align:left
        }

        li{
        list-style-type: none;
        }
      `}</style>
      </div>
    );
    
  }
  
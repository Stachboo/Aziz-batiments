import { Resend } from 'resend';

let _resend: Resend | null = null;
function getResend() {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

interface DevisEmailData {
  nom: string;
  email: string;
  telephone: string;
  adresse?: string;
  service?: string;
  surface?: string;
  budget?: string;
  delai?: string;
  description: string;
  photosUrls?: string[];
}

export async function sendDevisEmail(data: DevisEmailData) {
  const {
    nom,
    email,
    telephone,
    adresse,
    service,
    surface,
    budget,
    delai,
    description,
    photosUrls,
  } = data;

  // EMAIL 1 — Internal notification
  await getResend().emails.send({
    from: 'onboarding@resend.dev',
    to: 'hadriabdelaziz1965@gmail.com',
    subject: `🔔 Nouveau devis — ${nom} — ${service || 'Non précisé'}`,
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#111;font-family:Arial,Helvetica,sans-serif;color:#e0e0e0;">
  <div style="max-width:600px;margin:0 auto;background:#1a1a1a;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#f97316,#ea580c);padding:24px 32px;">
      <h1 style="margin:0;font-size:22px;color:#fff;font-weight:700;">Nouvelle demande de devis</h1>
    </div>

    <div style="padding:32px;">
      <!-- Data table -->
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#999;width:140px;">Nom</td>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#fff;font-weight:600;">${nom}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#999;">Téléphone</td>
          <td style="padding:10px 12px;border-bottom:1px solid #333;"><a href="tel:${telephone}" style="color:#f97316;text-decoration:none;">${telephone}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#999;">Email</td>
          <td style="padding:10px 12px;border-bottom:1px solid #333;"><a href="mailto:${email}" style="color:#f97316;text-decoration:none;">${email}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#999;">Adresse</td>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#fff;">${adresse || '—'}</td>
        </tr>
        <tr><td colspan="2" style="padding:16px 0;border-bottom:1px solid #444;"></td></tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#999;">Service</td>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#fff;font-weight:600;">${service || '—'}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#999;">Surface</td>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#fff;">${surface ? surface + ' m²' : '—'}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#999;">Budget</td>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#fff;">${budget || '—'}</td>
        </tr>
        <tr>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#999;">Délai</td>
          <td style="padding:10px 12px;border-bottom:1px solid #333;color:#fff;">${delai || '—'}</td>
        </tr>
      </table>

      <!-- Description -->
      <div style="margin-top:24px;">
        <p style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Description du projet</p>
        <blockquote style="margin:0;padding:16px 20px;border-left:4px solid #f97316;background:#252525;color:#e0e0e0;font-size:14px;line-height:1.6;border-radius:0 4px 4px 0;">
          ${description}
        </blockquote>
      </div>

      ${photosUrls && photosUrls.length > 0 ? `
      <!-- Photos -->
      <div style="margin-top:24px;">
        <p style="font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;">Photos jointes</p>
        <ul style="padding-left:20px;color:#e0e0e0;font-size:14px;">
          ${photosUrls.map((url, i) => `<li style="margin-bottom:6px;"><a href="${url}" style="color:#f97316;text-decoration:none;">Photo ${i + 1}</a></li>`).join('')}
        </ul>
      </div>
      ` : ''}
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px;background:#111;border-top:1px solid #333;text-align:center;">
      <p style="margin:0;font-size:11px;color:#666;">Rénovation France — SIRET 123 456 789 00012</p>
    </div>
  </div>
</body>
</html>`,
  });

  // EMAIL 2 — Client confirmation
  await getResend().emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '✅ Votre demande de devis a bien été reçue — Rénovation France',
    html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#111;font-family:Arial,Helvetica,sans-serif;color:#e0e0e0;">
  <div style="max-width:600px;margin:0 auto;background:#1a1a1a;">
    <!-- Header -->
    <div style="background:linear-gradient(135deg,#f97316,#ea580c);padding:24px 32px;">
      <h1 style="margin:0;font-size:22px;color:#fff;font-weight:700;">Demande bien reçue !</h1>
    </div>

    <div style="padding:32px;">
      <p style="font-size:16px;line-height:1.6;color:#e0e0e0;">
        Bonjour <strong>${nom}</strong>,
      </p>
      <p style="font-size:14px;line-height:1.6;color:#ccc;">
        Nous avons bien reçu votre demande de devis et nous vous en remercions.
        Notre équipe étudiera votre projet avec attention et vous contactera
        <strong>dans les 48 heures</strong> pour discuter des détails et vous
        fournir une estimation personnalisée.
      </p>

      ${service ? `
      <div style="margin:24px 0;padding:16px 20px;border-left:4px solid #f97316;background:#252525;border-radius:0 4px 4px 0;">
        <p style="margin:0;font-size:12px;color:#999;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px;">Service demandé</p>
        <p style="margin:0;font-size:16px;color:#fff;font-weight:600;">${service}</p>
      </div>
      ` : ''}

      <p style="font-size:14px;line-height:1.6;color:#ccc;">
        En attendant, n'hésitez pas à nous contacter directement :
      </p>
      <p style="margin:16px 0;">
        <a href="tel:0649427544" style="color:#f97316;font-size:18px;font-weight:700;text-decoration:none;">
          📞 06 49 42 75 44
        </a>
      </p>
      <p style="font-size:13px;color:#999;">Lun – Ven : 8h – 19h · Sam : 9h – 17h</p>
    </div>

    <!-- Footer -->
    <div style="padding:20px 32px;background:#111;border-top:1px solid #333;text-align:center;">
      <p style="margin:0;font-size:11px;color:#666;">Rénovation France — SIRET 123 456 789 00012</p>
    </div>
  </div>
</body>
</html>`,
  });
}

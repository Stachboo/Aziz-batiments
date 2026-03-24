'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Upload,
  X,
  Loader2,
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

interface FormState {
  nom: string;
  telephone: string;
  email: string;
  adresse: string;
  service: string;
  surface: string;
  budget: string;
  delai: string;
  description: string;
}

export default function DevisPage() {
  const t = useTranslations();

  const serviceOptions = [
    { value: t('devis.service.carrelage'), label: t('devis.service.carrelage') },
    { value: t('devis.service.placo'), label: t('devis.service.placo') },
    { value: t('devis.service.peinture'), label: t('devis.service.peinture') },
    { value: t('devis.service.multiple'), label: t('devis.service.multiple') },
  ];
  const budgetOptions = [
    t('devis.budget.1'),
    t('devis.budget.2'),
    t('devis.budget.3'),
    t('devis.budget.4'),
    t('devis.budget.5'),
  ];
  const delaiOptions = [
    t('devis.delai.1'),
    t('devis.delai.2'),
    t('devis.delai.3'),
    t('devis.delai.4'),
  ];

  const [form, setForm] = useState<FormState>({
    nom: '',
    telephone: '',
    email: '',
    adresse: '',
    service: '',
    surface: '',
    budget: '',
    delai: '',
    description: '',
  });
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback(
    (accepted: File[]) => {
      const remaining = 5 - photos.length;
      const toAdd = accepted.slice(0, remaining);
      setPhotos((prev) => [...prev, ...toAdd]);
      setPreviews((prev) => [
        ...prev,
        ...toAdd.map((f) => URL.createObjectURL(f)),
      ]);
    },
    [photos.length]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 5,
    maxSize: 8 * 1024 * 1024,
  });

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const updateField = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      photos.forEach((photo) => {
        formData.append('photos', photo);
      });

      const res = await fetch('/api/devis', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Error');
      setSuccess(true);
    } catch {
      setError(t('devis.error'));
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-charbon-800 px-6">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-gradient-flamme rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-white" />
          </div>
          <h2 className="font-display uppercase text-3xl font-bold mb-4">
            {t('devis.success.title')}
          </h2>
          <p className="text-acier-400 mb-8">
            {t('devis.success.text')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:0649427544" className="btn-flamme rounded justify-center">
              <Phone size={16} />
              {t('nav.call')}
            </a>
            <button
              onClick={() => {
                setSuccess(false);
                setForm({
                  nom: '',
                  telephone: '',
                  email: '',
                  adresse: '',
                  service: '',
                  surface: '',
                  budget: '',
                  delai: '',
                  description: '',
                });
                setPhotos([]);
                setPreviews([]);
              }}
              className="border border-charbon-500 hover:border-flamme-400 px-6 py-3 font-display uppercase tracking-wider text-sm transition-colors rounded"
            >
              {t('devis.success.new')}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-16 bg-charbon-900">
        <div className="absolute inset-0 stripe-accent pointer-events-none" />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-flamme-400" />
            <span className="font-mono text-flamme-400 uppercase tracking-[0.3em] text-xs">
              {t('devis.eyebrow')}
            </span>
          </div>
          <h1 className="font-display font-bold uppercase text-4xl md:text-5xl mb-4">
            {t('devis.headline')}
          </h1>
          <p className="text-acier-400 max-w-xl">
            {t('devis.subtext')}
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 bg-charbon-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main form */}
            <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
              {/* Error */}
              {error && (
                <div className="flex items-center gap-3 bg-rouge/10 border border-rouge/30 text-rouge px-6 py-4 rounded">
                  <AlertCircle size={20} />
                  <p className="text-sm">{error}</p>
                </div>
              )}

              {/* Section 01 - Coordonnées */}
              <fieldset className="bg-charbon-700 border border-charbon-500 p-8 rounded">
                <span className="font-mono text-flamme-400 text-xs uppercase tracking-wider">
                  01 — {t('devis.section1')}
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label className="block text-sm font-display uppercase tracking-wider mb-2">
                      {t('devis.nom')} *
                    </label>
                    <input
                      type="text"
                      required
                      dir="auto"
                      value={form.nom}
                      onChange={(e) => updateField('nom', e.target.value)}
                      className="input-custom w-full px-4 py-3 rounded"
                      placeholder={t('devis.placeholder.nom')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-display uppercase tracking-wider mb-2">
                      {t('devis.telephone')} *
                    </label>
                    <input
                      type="tel"
                      required
                      dir="auto"
                      value={form.telephone}
                      onChange={(e) => updateField('telephone', e.target.value)}
                      className="input-custom w-full px-4 py-3 rounded"
                      placeholder={t('devis.placeholder.telephone')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-display uppercase tracking-wider mb-2">
                      {t('devis.email')} *
                    </label>
                    <input
                      type="email"
                      required
                      dir="auto"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="input-custom w-full px-4 py-3 rounded"
                      placeholder={t('devis.placeholder.email')}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-display uppercase tracking-wider mb-2">
                      {t('devis.adresse')}
                    </label>
                    <input
                      type="text"
                      dir="auto"
                      value={form.adresse}
                      onChange={(e) => updateField('adresse', e.target.value)}
                      className="input-custom w-full px-4 py-3 rounded"
                      placeholder={t('devis.placeholder.adresse')}
                    />
                  </div>
                </div>
              </fieldset>

              {/* Section 02 - Projet */}
              <fieldset className="bg-charbon-700 border border-charbon-500 p-8 rounded">
                <span className="font-mono text-flamme-400 text-xs uppercase tracking-wider">
                  02 — {t('devis.section2')}
                </span>

                {/* Service */}
                <div className="mt-6">
                  <label className="block text-sm font-display uppercase tracking-wider mb-3">
                    {t('devis.service.label')}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {serviceOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updateField('service', opt.value)}
                        className={`px-5 py-2 rounded-full text-sm font-mono uppercase tracking-wider transition-all ${
                          form.service === opt.value
                            ? 'bg-gradient-flamme text-white'
                            : 'border border-charbon-500 text-acier-400 hover:border-flamme-400'
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Surface */}
                <div className="mt-6">
                  <label className="block text-sm font-display uppercase tracking-wider mb-2">
                    {t('devis.surface')}
                  </label>
                  <input
                    type="number"
                    dir="auto"
                    value={form.surface}
                    onChange={(e) => updateField('surface', e.target.value)}
                    className="input-custom w-full max-w-xs px-4 py-3 rounded text-sm"
                    placeholder={t('devis.surfacePlaceholder')}
                  />
                </div>

                {/* Budget */}
                <div className="mt-6">
                  <label className="block text-sm font-display uppercase tracking-wider mb-3">
                    {t('devis.budget.label')}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {budgetOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateField('budget', opt)}
                        className={`px-5 py-2 rounded-full text-sm font-mono uppercase tracking-wider transition-all ${
                          form.budget === opt
                            ? 'bg-gradient-flamme text-white'
                            : 'border border-charbon-500 text-acier-400 hover:border-flamme-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Délai */}
                <div className="mt-6">
                  <label className="block text-sm font-display uppercase tracking-wider mb-3">
                    {t('devis.delai.label')}
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {delaiOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => updateField('delai', opt)}
                        className={`px-5 py-2 rounded-full text-sm font-mono uppercase tracking-wider transition-all ${
                          form.delai === opt
                            ? 'bg-gradient-flamme text-white'
                            : 'border border-charbon-500 text-acier-400 hover:border-flamme-400'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="mt-6">
                  <label className="block text-sm font-display uppercase tracking-wider mb-2">
                    {t('devis.description.label')}
                  </label>
                  <textarea
                    rows={5}
                    dir="auto"
                    value={form.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    className="input-custom w-full px-4 py-3 rounded resize-none"
                    placeholder={t('devis.description.placeholder')}
                  />
                </div>
              </fieldset>

              {/* Section 03 - Photos */}
              <fieldset className="bg-charbon-700 border border-charbon-500 p-8 rounded">
                <span className="font-mono text-flamme-400 text-xs uppercase tracking-wider">
                  03 — {t('devis.section3')} ({t('devis.section3Hint')})
                </span>

                <div className="mt-6">
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded p-10 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? 'border-flamme-400 bg-flamme-400/5'
                        : 'border-charbon-500 hover:border-flamme-400/50'
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload size={32} className="mx-auto text-acier-400 mb-3" />
                    <p className="text-sm text-acier-400">
                      {t('devis.photos.cta')}
                    </p>
                    <p className="text-xs text-acier-400/60 mt-1">
                      {t('devis.photos.hint')}
                    </p>
                  </div>

                  {/* Previews */}
                  {previews.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mt-6">
                      {previews.map((src, i) => (
                        <div
                          key={i}
                          className="group relative aspect-square rounded overflow-hidden"
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={src}
                            alt={`Photo ${i + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(i)}
                            className="absolute top-1 end-1 w-6 h-6 bg-rouge rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </fieldset>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn-flamme rounded w-full justify-center text-lg py-4"
              >
                {loading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  t('devis.submit')
                )}
              </button>
              <p className="font-mono text-xs text-acier-400 text-center">
                {t('devis.guarantee')}
              </p>
            </form>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Phone card */}
              <div className="bg-gradient-flamme p-6 rounded">
                <h3 className="font-display uppercase tracking-wider text-lg mb-3">
                  {t('devis.sidebar.call.title')}
                </h3>
                <a
                  href="tel:0649427544"
                  dir="ltr"
                  className="font-display text-2xl font-bold block mb-2"
                >
                  06 49 42 75 44
                </a>
                <p className="text-white/70 text-sm">
                  {t('devis.sidebar.call.hours')}
                </p>
              </div>

              {/* Email card */}
              <div className="bg-charbon-700 border border-charbon-500 p-6 rounded">
                <div className="flex items-center gap-3 mb-2">
                  <Mail size={18} className="text-flamme-400" />
                  <h3 className="font-display uppercase tracking-wider text-sm">
                    {t('devis.sidebar.email.title')}
                  </h3>
                </div>
                <a
                  href="mailto:hadriabdelaziz1965@gmail.com"
                  dir="ltr"
                  className="text-acier-400 text-sm hover:text-flamme-400 transition-colors"
                >
                  hadriabdelaziz1965@gmail.com
                </a>
              </div>

              {/* Why us card */}
              <div className="bg-charbon-700 border border-charbon-500 p-6 rounded">
                <h3 className="font-display uppercase tracking-wider text-sm mb-4">
                  {t('devis.sidebar.why')}
                </h3>
                <ul className="space-y-3 text-sm text-acier-400">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <li key={n} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-flamme-400 flex-shrink-0 mt-1.5" />
                      {t(`devis.why.${n}`)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

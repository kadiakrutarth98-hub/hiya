import React, { useState } from "react";

export default function App() {
  const [nav, setNav] = useState("home");
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    phone: "",
    email: "",
    website: "",
    industry: "",
    goals: [],
    package: "",
    message: "",
  });

  const handleNav = (id) => setNav(id);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((s) => ({
        ...s,
        goals: checked ? [...s.goals, value] : s.goals.filter((g) => g !== value),
      }));
      return;
    }
    setFormData((s) => ({ ...s, [name]: value }));
  };

  
const submitForm = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (res.ok) {
      alert('Thanks — we received your submission. We will contact you shortly.');
      console.log('Server response:', data);
      setFormData({ businessName:'', contactName:'', phone:'', email:'', website:'', industry:'', goals:[], package:'', message:'' });
    } else {
      console.error('Submission error', data);
      alert('Submission failed: ' + (data.error || 'Unknown error'));
    }
  } catch (err) {
    console.error('Submission exception', err);
    alert('Submission failed. Check console for details.');
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold">HI</div>
          <div>
            <h1 className="text-xl font-semibold">Hiyadigital</h1>
            <p className="text-xs text-slate-500">Growth-focused digital marketing agency</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-4 items-center text-sm">
          <button onClick={() => handleNav('home')} className="hover:text-blue-600">Home</button>
          <button onClick={() => handleNav('services')} className="hover:text-blue-600">Services</button>
          <button onClick={() => handleNav('packages')} className="hover:text-blue-600">Packages</button>
          <button onClick={() => handleNav('workflow')} className="hover:text-blue-600">Workflow</button>
          <button onClick={() => handleNav('sop')} className="hover:text-blue-600">SOPs</button>
          <button onClick={() => handleNav('onboarding')} className="hover:text-blue-600">Onboarding</button>
          <button onClick={() => handleNav('contact')} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:opacity-95">Get Started</button>
        </nav>
        <div className="md:hidden">
          <select onChange={(e) => handleNav(e.target.value)} value={nav} className="border rounded p-2 text-sm">
            <option value="home">Home</option>
            <option value="services">Services</option>
            <option value="packages">Packages</option>
            <option value="workflow">Workflow</option>
            <option value="sop">SOPs</option>
            <option value="onboarding">Onboarding</option>
            <option value="contact">Contact</option>
          </select>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {nav === 'home' && (
          <section className="grid md:grid-cols-2 gap-8 items-center py-12">
            <div>
              <h2 className="text-4xl font-extrabold leading-tight">Hiyadigital — Digital Marketing That Delivers Customers</h2>
              <p className="mt-4 text-slate-600">We combine strategic SEO, high-converting websites, cinematic video, paid campaigns and social media management to grow local & niche businesses. Specialised packages for wellness coaches, reiki healers, gyms and restaurants.</p>

              <div className="mt-6 flex gap-3">
                <button onClick={() => handleNav('onboarding')} className="bg-blue-600 text-white px-5 py-3 rounded-lg font-medium">Start Onboarding</button>
                <button onClick={() => handleNav('packages')} className="border border-slate-200 px-5 py-3 rounded-lg">See Packages</button>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="text-sm font-semibold">Monthly Retainers</h4>
                  <p className="text-xs text-slate-500">Predictable growth & performance</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="text-sm font-semibold">Specialised Niches</h4>
                  <p className="text-xs text-slate-500">Wellness, Fitness, Food & Local businesses</p>
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-cyan-50 to-white p-6 shadow-md">
              <div className="h-56 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400">Hero Visual / Video Placeholder</div>
              <ul className="mt-6 text-sm space-y-2">
                <li>✅ Free audit on first month</li>
                <li>✅ Transparent reporting</li>
                <li>✅ 30-day measurable improvements</li>
              </ul>
            </div>
          </section>
        )}

        {nav === 'services' && (
          <section className="py-10">
            <h3 className="text-2xl font-bold">Services — What We Do</h3>
            <p className="text-slate-600 mt-2">End-to-end digital marketing services designed to scale revenue and customer acquisition.</p>

            <div className="grid md:grid-cols-3 gap-6 mt-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold">Social Media Management</h4>
                <p className="text-sm text-slate-500 mt-2">Strategy, content calendar, reels, captions, posting & analytics</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold">Website Development</h4>
                <p className="text-sm text-slate-500 mt-2">High-converting WordPress/Shopify sites with on-page SEO</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold">Video Production</h4>
                <p className="text-sm text-slate-500 mt-2">Concept, shoot, edit, color-grade, and platform-optimised cuts</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold">Paid Campaigns</h4>
                <p className="text-sm text-slate-500 mt-2">Facebook, Instagram & Google — setup, optimisation, A/B tests</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold">SEO</h4>
                <p className="text-sm text-slate-500 mt-2">Technical + on-page + off-page with content and local SEO</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold">Consulting & Strategy</h4>
                <p className="text-sm text-slate-500 mt-2">Brand strategy, funnels, pricing, and growth plans</p>
              </div>
            </div>
          </section>
        )}

        {nav === 'packages' && (
          <section className="py-10">
            <h3 className="text-2xl font-bold">Packages (Industry Tailored)</h3>
            <p className="text-slate-600 mt-2">Ready-made retainer packages for wellness coaches, reiki healers, gyms and restaurants. SEO add-ons available.</p>

            <div className="mt-6 grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-white to-cyan-50 p-6 rounded-xl shadow-lg">
                <h4 className="font-bold">Wellness Coach - Basic</h4>
                <div className="text-sm text-slate-600 mt-2">₹12,000 / month</div>
                <ul className="mt-3 text-sm space-y-1">
                  <li>• 12 posts</li>
                  <li>• 4 reels</li>
                  <li>• Basic branding</li>
                  <li>• Monthly report</li>
                </ul>
                <div className="mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">Start with this</button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-cyan-50 p-6 rounded-xl shadow-lg">
                <h4 className="font-bold">Gym - Standard</h4>
                <div className="text-sm text-slate-600 mt-2">₹28,000 / month</div>
                <ul className="mt-3 text-sm space-y-1">
                  <li>• 16 posts</li>
                  <li>• 8 reels</li>
                  <li>• Local ads</li>
                  <li>• GMB optimization</li>
                </ul>
                <div className="mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">Start with this</button>
                </div>
              </div>

              <div className="bg-gradient-to-br from-white to-cyan-50 p-6 rounded-xl shadow-lg">
                <h4 className="font-bold">Restaurant - Premium</h4>
                <div className="text-sm text-slate-600 mt-2">₹60,000 / month</div>
                <ul className="mt-3 text-sm space-y-1">
                  <li>• 15 reels</li>
                  <li>• Influencer collab</li>
                  <li>• Google Ads</li>
                  <li>• High-quality shoots</li>
                </ul>
                <div className="mt-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">Start with this</button>
                </div>
              </div>
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
              <h4 className="font-semibold">SEO Packages (Add-on)</h4>
              <div className="mt-4 grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-white rounded-lg border">
                  <h5 className="font-semibold">Basic SEO</h5>
                  <div className="text-sm text-slate-600 mt-1">₹8k–12k / month</div>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>• Audit</li>
                    <li>• On-page</li>
                    <li>• 3–5 backlinks</li>
                    <li>• GMB</li>
                  </ul>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <h5 className="font-semibold">Standard SEO</h5>
                  <div className="text-sm text-slate-600 mt-1">₹18k–28k / month</div>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>• 8–10 backlinks</li>
                    <li>• 2 blogs / month</li>
                    <li>• Competitor analysis</li>
                  </ul>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <h5 className="font-semibold">Premium SEO</h5>
                  <div className="text-sm text-slate-600 mt-1">₹30k–45k / month</div>
                  <ul className="mt-2 text-sm space-y-1">
                    <li>• 15–20 backlinks</li>
                    <li>• Technical SEO</li>
                    <li>• 4 blogs / month</li>
                  </ul>
                </div>
              </div>
            </div>

          </section>
        )}

        {nav === 'workflow' && (
          <section className="py-10">
            <h3 className="text-2xl font-bold">Company Workflow</h3>
            <p className="text-slate-600 mt-2">How Hiyadigital runs client projects — efficient, transparent and repeatable.</p>

            <div className="mt-6 space-y-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold">Onboarding</h5>
                <ul className="mt-2 text-sm space-y-1">
                  <li>• Discovery call & goals</li>
                  <li>• Proposal & contract</li>
                  <li>• Collect brand assets & access</li>
                  <li>• Kickoff meeting</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold">Monthly Cycle</h5>
                <ul className="mt-2 text-sm space-y-1">
                  <li>• Week 1 — Strategy & calendar</li>
                  <li>• Week 2 — Content creation & shoots</li>
                  <li>• Week 3 — Posting & ads</li>
                  <li>• Week 4 — Reporting & optimisation</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold">SOPs & Quality Control</h5>
                <ul className="mt-2 text-sm space-y-1">
                  <li>• Content QA checklist</li>
                  <li>• Ad pre-launch checklist</li>
                  <li>• Website deploy checklist</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {nav === 'sop' && (
          <section className="py-10">
            <h3 className="text-2xl font-bold">SOP Checklists</h3>
            <p className="text-slate-600 mt-2">Operational checklists to ensure consistent delivery and quality.</p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold">Social Media Content</h5>
                <ul className="mt-2 text-sm space-y-1">
                  <li>• Research competitors</li>
                  <li>• Create monthly themes</li>
                  <li>• Design & reels</li>
                  <li>• Client approval</li>
                  <li>• Scheduling</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold">Paid Ads</h5>
                <ul className="mt-2 text-sm space-y-1">
                  <li>• Define objective</li>
                  <li>• Audience</li>
                  <li>• Ad creative</li>
                  <li>• Install pixel</li>
                  <li>• Monitor & optimise</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold">SEO Monthly</h5>
                <ul className="mt-2 text-sm space-y-1">
                  <li>• Audit</li>
                  <li>• Fix speed</li>
                  <li>• On-page</li>
                  <li>• Backlinks</li>
                  <li>• Blogs</li>
                </ul>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h5 className="font-semibold">Website Development</h5>
                <ul className="mt-2 text-sm space-y-1">
                  <li>• Wireframe</li>
                  <li>• Design approval</li>
                  <li>• Responsive dev</li>
                  <li>• Testing</li>
                  <li>• Deployment</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {nav === 'onboarding' && (
          <section className="py-10">
            <h3 className="text-2xl font-bold">Client Onboarding Form</h3>
            <p className="text-slate-600 mt-2">Fill this form to start your growth plan with Hiyadigital.</p>

            <form onSubmit={submitForm} className="mt-6 grid md:grid-cols-2 gap-4">
              <label className="block">
                <div className="text-sm font-medium">Business Name</div>
                <input name="businessName" value={formData.businessName} onChange={handleChange} className="mt-2 w-full border rounded p-2" />
              </label>
              <label className="block">
                <div className="text-sm font-medium">Contact Name</div>
                <input name="contactName" value={formData.contactName} onChange={handleChange} className="mt-2 w-full border rounded p-2" />
              </label>
              <label className="block">
                <div className="text-sm font-medium">Phone</div>
                <input name="phone" value={formData.phone} onChange={handleChange} className="mt-2 w-full border rounded p-2" />
              </label>
              <label className="block">
                <div className="text-sm font-medium">Email</div>
                <input name="email" value={formData.email} onChange={handleChange} type="email" className="mt-2 w-full border rounded p-2" />
              </label>
              <label className="block">
                <div className="text-sm font-medium">Website (if any)</div>
                <input name="website" value={formData.website} onChange={handleChange} className="mt-2 w-full border rounded p-2" />
              </label>
              <label className="block">
                <div className="text-sm font-medium">Industry / Category</div>
                <input name="industry" value={formData.industry} onChange={handleChange} className="mt-2 w-full border rounded p-2" />
              </label>

              <div className="md:col-span-2 bg-white p-4 rounded-lg shadow-sm">
                <label className="text-sm font-medium">Primary Goals (select any)</label>
                <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                  {['Increase brand awareness','Increase leads','Improve SEO','Increase footfall','Build personal brand'].map((g) => (
                    <label key={g} className="flex items-center gap-2"><input type="checkbox" name="goals" value={g} onChange={handleChange} /> {g}</label>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Preferred Package</label>
                <select name="package" value={formData.package} onChange={handleChange} className="mt-2 w-full border rounded p-2">
                  <option value="">Select a package</option>
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium">Message / Requirements</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows={4} className="mt-2 w-full border rounded p-2"></textarea>
              </div>

              <div className="md:col-span-2 flex gap-3">
                <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg">Submit & Start Audit</button>
                <button type="button" onClick={() => { setFormData({ businessName:'', contactName:'', phone:'', email:'', website:'', industry:'', goals:[], package:'', message:'' }) }} className="border px-6 py-3 rounded-lg">Reset</button>
              </div>
            </form>

          </section>
        )}

        {nav === 'contact' && (
          <section className="py-10">
            <h3 className="text-2xl font-bold">Contact & Next Steps</h3>
            <p className="text-slate-600 mt-2">Ready to grow? Here's how we work and how to start.</p>

            <div className="mt-6 grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold">How we start</h4>
                <ol className="mt-3 list-decimal list-inside text-sm space-y-2">
                  <li>Free audit & discovery call</li>
                  <li>Proposal & package selection</li>
                  <li>Onboarding & kickoff</li>
                  <li>Month 1 – strategy & implementation</li>
                </ol>

                <div className="mt-6">
                  <p className="text-sm">Email: hello@hiyadigital.com</p>
                  <p className="text-sm">Phone: +91 99999 99999</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h4 className="font-semibold">Quick FAQ</h4>
                <div className="mt-3 text-sm space-y-2">
                  <p><strong>Q:</strong> Minimum contract?<br /> <strong>A:</strong> 1 month for retainers, 50% advance for websites.</p>
                  <p><strong>Q:</strong> How do you report?<br /> <strong>A:</strong> Monthly analytics + weekly WhatsApp updates.</p>
                </div>
              </div>
            </div>

          </section>
        )}

        <footer className="mt-12 py-8 border-t">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h4 className="font-bold">Hiyadigital</h4>
              <p className="text-xs text-slate-500">Full-service digital marketing — SEO, websites, video, ads & social.</p>
            </div>
            <div className="text-sm text-slate-500">© {new Date().getFullYear()} Hiyadigital. All rights reserved.</div>
          </div>
        </footer>

      </main>
    </div>
  );
}
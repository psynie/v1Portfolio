import { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { profile } from "../data";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | ok | err

  useEffect(() => { emailjs.init("xkUjlYq_ftHB_Wlto"); }, []);
  const change = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send("service_fd9loz6", "template_6yi28it", {
        to_email: profile.email, from_name: form.name, from_email: form.email, subject: form.subject, message: form.message,
      });
      setStatus("ok");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("err");
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="form-row">
        <div className="form-group"><label htmlFor="name">Name</label><input id="name" name="name" value={form.name} onChange={change} required /></div>
        <div className="form-group"><label htmlFor="email">Email</label><input id="email" type="email" name="email" value={form.email} onChange={change} required /></div>
      </div>
      <div className="form-group"><label htmlFor="subject">Subject</label><input id="subject" name="subject" value={form.subject} onChange={change} /></div>
      <div className="form-group"><label htmlFor="message">Message</label><textarea id="message" name="message" value={form.message} onChange={change} required /></div>
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Submit"}</button>
      <div aria-live="polite">
        {status === "ok" && <p className="msg ok">Thanks, your message was sent. I'll get back to you soon.</p>}
        {status === "err" && <p className="msg err">Couldn't send that. Please try again or email me directly.</p>}
      </div>
    </form>
  );
}

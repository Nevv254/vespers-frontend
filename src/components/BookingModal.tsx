import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Calendar, Users, MapPin, Mail, Phone, User, Globe } from "lucide-react";
import { featuredSafaris } from "../data/siteContent";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSafariTitle?: string;
}

export function BookingModal({ isOpen, onClose, selectedSafariTitle }: BookingModalProps) {
  const [safariTitle, setSafariTitle] = useState(selectedSafariTitle || featuredSafaris[0]?.title || "The Mara, Uncovered");
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    nationality: "Kenya",
    travelers: 2,
    travelDate: "",
    specialRequests: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successReference, setSuccessReference] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync when selectedSafariTitle prop changes
  if (selectedSafariTitle && selectedSafariTitle !== safariTitle && !successReference && !isSubmitting) {
    setSafariTitle(selectedSafariTitle);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";
    const refCode = `VES-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    try {
      // Find package ID if matches backend
      const safariIndex = featuredSafaris.findIndex((s) => s.title === safariTitle);
      const packageId = safariIndex >= 0 ? safariIndex + 1 : 1;

      const payload = {
        package: packageId,
        customer_name: formData.customerName,
        email: formData.email,
        phone: formData.phone,
        nationality: formData.nationality,
        travelers: Number(formData.travelers),
        travel_date: formData.travelDate || new Date().toISOString().split("T")[0],
        special_requests: `[Safari: ${safariTitle}] ${formData.specialRequests}`,
      };

      const response = await fetch(`${apiBaseUrl}/bookings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessReference(data.booking_reference || refCode);
      } else {
        // Graceful fallback for offline development
        const offlineBookings = JSON.parse(localStorage.getItem("vespers_inquiries") || "[]");
        offlineBookings.push({ ...payload, booking_reference: refCode, created_at: new Date().toISOString() });
        localStorage.setItem("vespers_inquiries", JSON.stringify(offlineBookings));
        setSuccessReference(refCode);
      }
    } catch {
      // In case server is unreachable, store locally
      const offlineBookings = JSON.parse(localStorage.getItem("vespers_inquiries") || "[]");
      offlineBookings.push({ ...formData, safariTitle, booking_reference: refCode, created_at: new Date().toISOString() });
      localStorage.setItem("vespers_inquiries", JSON.stringify(offlineBookings));
      setSuccessReference(refCode);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessReference(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
          <motion.div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
          >
            <button className="modal-close" onClick={onClose} aria-label="Close modal">
              <X size={20} />
            </button>

            {successReference ? (
              <div className="modal-success">
                <CheckCircle2 size={56} className="modal-success__icon" />
                <p className="eyebrow eyebrow--orange">INQUIRY RECEIVED</p>
                <h2>Your journey<br /><em>begins now.</em></h2>
                <p className="modal-success__copy">
                  Thank you for entrusting Vespers with your African journey. Our safari specialist will reach out within 24 hours to craft your bespoke itinerary.
                </p>
                <div className="modal-success__ref">
                  <span>BOOKING REFERENCE</span>
                  <strong>{successReference}</strong>
                </div>
                <button className="button button--orange" onClick={handleReset}>
                  Close & Explore
                </button>
              </div>
            ) : (
              <div>
                <p className="eyebrow eyebrow--orange">BESPOKE SAFARI INQUIRY</p>
                <h2>Plan your<br /><em>African Escape.</em></h2>
                <p className="modal-subtitle">
                  Tell us your dreams of discovery. We tailor each itinerary to your pace, preferences, and desires.
                </p>

                {errorMsg && <div className="modal-error">{errorMsg}</div>}

                <form onSubmit={handleSubmit} className="modal-form">
                  <div className="form-group">
                    <label htmlFor="safariTitle">Select Desired Journey</label>
                    <div className="input-wrap">
                      <MapPin size={16} className="input-icon" />
                      <select
                        id="safariTitle"
                        name="safariTitle"
                        value={safariTitle}
                        onChange={(e) => setSafariTitle(e.target.value)}
                        required
                      >
                        {featuredSafaris.map((s) => (
                          <option key={s.title} value={s.title}>
                            {s.title} ({s.region})
                          </option>
                        ))}
                        <option value="Custom African Itinerary">Custom African Itinerary</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="customerName">Full Name</label>
                      <div className="input-wrap">
                        <User size={16} className="input-icon" />
                        <input
                          id="customerName"
                          type="text"
                          name="customerName"
                          placeholder="e.g. Evelyn Ndung'u"
                          value={formData.customerName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <div className="input-wrap">
                        <Mail size={16} className="input-icon" />
                        <input
                          id="email"
                          type="email"
                          name="email"
                          placeholder="evelyn@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-grid-3">
                    <div className="form-group">
                      <label htmlFor="phone">Phone / WhatsApp</label>
                      <div className="input-wrap">
                        <Phone size={16} className="input-icon" />
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          placeholder="+254 700 000000"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="nationality">Nationality / Country</label>
                      <div className="input-wrap">
                        <Globe size={16} className="input-icon" />
                        <input
                          id="nationality"
                          type="text"
                          name="nationality"
                          placeholder="Kenya, UK, USA..."
                          value={formData.nationality}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="travelers">Travelers</label>
                      <div className="input-wrap">
                        <Users size={16} className="input-icon" />
                        <input
                          id="travelers"
                          type="number"
                          name="travelers"
                          min="1"
                          max="20"
                          value={formData.travelers}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="travelDate">Preferred Travel Date</label>
                    <div className="input-wrap">
                      <Calendar size={16} className="input-icon" />
                      <input
                        id="travelDate"
                        type="date"
                        name="travelDate"
                        value={formData.travelDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="specialRequests">Preferences or Notes (Optional)</label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      rows={3}
                      placeholder="Special milestones, lodge preferences, dietary notes, balloon safaris..."
                      value={formData.specialRequests}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="modal-actions">
                    <button type="submit" className="button button--orange" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting Inquiry..." : "Submit Safari Inquiry"}
                    </button>
                    <button type="button" className="button button--outline" onClick={onClose}>
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

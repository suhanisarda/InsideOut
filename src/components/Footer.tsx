import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-lavender rounded-lg flex items-center justify-center">
                <Heart className="text-white w-5 h-5 fill-current" />
              </div>
              <span className="text-xl font-display font-bold text-dark-gray">Inside Out</span>
            </Link>
            <p className="text-dark-gray/60 text-sm leading-relaxed">
              Supporting college students in their journey towards better mental health and emotional well-being.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-dark-gray/60">
              <li><Link to="/check-in" className="hover:text-lavender transition-colors">Daily Check-In</Link></li>
              <li><Link to="/insights" className="hover:text-lavender transition-colors">Mood Insights</Link></li>
              <li><Link to="/vent" className="hover:text-lavender transition-colors">Vent Space</Link></li>
              <li><Link to="/tools" className="hover:text-lavender transition-colors">Self-Help Tools</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-dark-gray/60">
              <li><Link to="/support" className="hover:text-lavender transition-colors">Emergency Helplines</Link></li>
              <li><Link to="/support" className="hover:text-lavender transition-colors">FAQs</Link></li>
              <li><Link to="/support" className="hover:text-lavender transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6">Stay Safe</h4>
            <p className="text-sm text-dark-gray/60 leading-relaxed">
              If you are in immediate danger or crisis, please contact a trusted person or call a mental health helpline immediately.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-dark-gray/40">
          <p>© 2026 Inside Out. All rights reserved.</p>
          <p>Made with ❤️ for students in India.</p>
        </div>
      </div>
    </footer>
  );
}

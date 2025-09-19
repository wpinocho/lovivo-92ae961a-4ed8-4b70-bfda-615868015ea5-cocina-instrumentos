import { ReactNode } from 'react'
import { PageTemplate } from './PageTemplate'
import { BrandLogoLeft } from '@/components/BrandLogoLeft'
import { SocialLinks } from '@/components/SocialLinks'
import { FloatingCart } from '@/components/FloatingCart'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ShoppingCart, ChefHat, Phone, Mail, MapPin } from 'lucide-react'
import { useCartUI } from '@/components/CartProvider'
import { useCart } from '@/contexts/CartContext'

/**
 * EDITABLE TEMPLATE - EcommerceTemplate
 * 
 * Template específico para páginas de ecommerce con header, footer y cart.
 * El agente IA puede modificar completamente el diseño, colores, layout.
 */

interface EcommerceTemplateProps {
  children: ReactNode
  pageTitle?: string
  showCart?: boolean
  className?: string
  headerClassName?: string
  footerClassName?: string
  layout?: 'default' | 'full-width' | 'centered'
}

export const EcommerceTemplate = ({
  children,
  pageTitle,
  showCart = true,
  className,
  headerClassName,
  footerClassName,
  layout = 'default'
}: EcommerceTemplateProps) => {
  const { openCart } = useCartUI()
  const { getTotalItems } = useCart()
  const totalItems = getTotalItems()

  const header = (
    <div className={`py-4 bg-white shadow-sm border-b ${headerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-kitchen-gradient">CocinaShop</span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-6">
              <Link 
                to="/" 
                className="text-foreground/70 hover:text-primary transition-colors font-medium"
              >
                Inicio
              </Link>
              <Link 
                to="/blog" 
                className="text-foreground/70 hover:text-primary transition-colors font-medium"
              >
                Recetas
              </Link>
              <Link 
                to="/contact" 
                className="text-foreground/70 hover:text-primary transition-colors font-medium"
              >
                Contacto
              </Link>
            </nav>
          </div>

          {/* Cart */}
          {showCart && (
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              className="relative hover:bg-primary/10"
            >
              <ShoppingCart className="h-6 w-6 text-foreground" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Button>
          )}
        </div>

        {/* Page Title */}
        {pageTitle && (
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-foreground">
              {pageTitle}
            </h1>
          </div>
        )}
      </div>
    </div>
  )

  const footer = (
    <div className={`bg-foreground text-background py-16 ${footerClassName}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ChefHat className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-background">CocinaShop</span>
            </div>
            <p className="text-background/80 mb-6 max-w-md">
              Tu tienda de confianza para instrumentos de cocina profesionales. 
              Calidad premium, precios justos y servicio excepcional desde 2020.
            </p>
            <SocialLinks />
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Enlaces</h3>
            <div className="space-y-3">
              <Link 
                to="/" 
                className="block text-background/80 hover:text-background transition-colors"
              >
                Inicio
              </Link>
              <Link 
                to="/blog" 
                className="block text-background/80 hover:text-background transition-colors"
              >
                Recetas
              </Link>
              <Link 
                to="/about" 
                className="block text-background/80 hover:text-background transition-colors"
              >
                Nosotros
              </Link>
              <Link 
                to="/contact" 
                className="block text-background/80 hover:text-background transition-colors"
              >
                Contacto
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4 text-background">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-background/80">
                <Phone className="h-4 w-4" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center space-x-2 text-background/80">
                <Mail className="h-4 w-4" />
                <span>info@cocinashop.com</span>
              </div>
              <div className="flex items-center space-x-2 text-background/80">
                <MapPin className="h-4 w-4" />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-background/20">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/70 text-sm">
              &copy; 2024 CocinaShop. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/privacy" className="text-background/70 hover:text-background text-sm transition-colors">
                Privacidad
              </Link>
              <Link to="/terms" className="text-background/70 hover:text-background text-sm transition-colors">
                Términos
              </Link>
              <Link to="/cookies" className="text-background/70 hover:text-background text-sm transition-colors">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <PageTemplate 
        header={header}
        footer={footer}
        className={className}
        layout={layout}
      >
        {children}
      </PageTemplate>
      
      {showCart && <FloatingCart />}
    </>
  )
}
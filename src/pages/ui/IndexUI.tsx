import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, ChefHat, Utensils, Star, Truck, Shield, Award } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { CollectionCard } from '@/components/CollectionCard';
import { FloatingCart } from '@/components/FloatingCart';
import { EcommerceTemplate } from '@/templates/EcommerceTemplate';
import type { UseIndexLogicReturn } from '@/components/headless/HeadlessIndex';

/**
 * EDITABLE UI - IndexUI
 * 
 * Interfaz completamente editable para la página principal.
 * El agente IA puede modificar colores, textos, layout, etc.
 */

interface IndexUIProps {
  logic: UseIndexLogicReturn;
}

export const IndexUI = ({ logic }: IndexUIProps) => {
  const {
    collections,
    blogs,
    loading,
    loadingCollections,
    loadingBlogs,
    searchTerm,
    selectedCollectionId,
    filteredProducts,
    setSearchTerm,
    handleViewCollectionProducts,
    handleShowAllProducts,
  } = logic;

  return (
    <EcommerceTemplate 
      showCart={true}
    >
      {/* Hero Section */}
      <section className="relative bg-kitchen-gradient py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in">
            <ChefHat className="h-16 w-16 text-white mx-auto mb-6" />
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Cocina Como un Chef
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Descubre los mejores instrumentos de cocina profesionales. Calidad superior, 
              precios increíbles y envío gratuito. ¡Transforma tu cocina hoy!
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative mb-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input 
                type="text" 
                placeholder="Buscar utensilios de cocina..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)} 
                className="pl-12 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-lg"
              />
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              <div className="flex items-center justify-center space-x-3 text-white/90">
                <Truck className="h-6 w-6" />
                <span className="font-medium">Envío Gratuito</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/90">
                <Shield className="h-6 w-6" />
                <span className="font-medium">Garantía 2 Años</span>
              </div>
              <div className="flex items-center justify-center space-x-3 text-white/90">
                <Award className="h-6 w-6" />
                <span className="font-medium">Calidad Premium</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      {!loadingCollections && collections.length > 0 && (
        <section className="py-16 bg-kitchen-warm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <Utensils className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Nuestras Categorías
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explora nuestra selección cuidadosamente curada de instrumentos de cocina 
                organizados por categorías para que encuentres exactamente lo que necesitas.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {collections.map((collection, index) => (
                <div key={collection.id} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CollectionCard 
                    collection={collection} 
                    onViewProducts={handleViewCollectionProducts} 
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Products Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-foreground mb-2">
                {selectedCollectionId 
                  ? `${collections.find(c => c.id === selectedCollectionId)?.name || 'Productos'}` 
                  : 'Productos Destacados'
                }
              </h2>
              <p className="text-lg text-muted-foreground">
                {selectedCollectionId 
                  ? 'Los mejores productos de esta categoría'
                  : 'Seleccionados especialmente para ti'
                }
              </p>
            </div>
            {selectedCollectionId && (
              <Button 
                variant="outline" 
                onClick={handleShowAllProducts}
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Ver Todos los Productos
              </Button>
            )}
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-muted rounded-lg h-96 animate-pulse"></div>
              ))}
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product, index) => (
                <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <ChefHat className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground mb-2">
                {searchTerm 
                  ? 'No encontramos productos que coincidan con tu búsqueda.' 
                  : 'No hay productos disponibles en este momento.'
                }
              </p>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? 'Intenta con otros términos de búsqueda.'
                  : 'Vuelve pronto para ver nuestras novedades.'
                }
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              ¿Por qué elegir nuestros productos?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Más de 10,000 chefs profesionales y aficionados confían en nosotros
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Calidad Premium</h3>
              <p className="text-muted-foreground">
                Seleccionamos solo los mejores materiales y marcas reconocidas mundialmente
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Envío Rápido</h3>
              <p className="text-muted-foreground">
                Entrega gratuita en 24-48h. Tu cocina estará lista para cocinar en tiempo récord
              </p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Garantía Total</h3>
              <p className="text-muted-foreground">
                2 años de garantía en todos nuestros productos. Tu satisfacción es nuestra prioridad
              </p>
            </div>
          </div>
        </div>
      </section>

      <FloatingCart />
    </EcommerceTemplate>
  );
};
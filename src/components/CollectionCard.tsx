import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-0">
        <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No image
            </div>
          )}
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-foreground font-bold text-xl line-clamp-1 group-hover:text-primary transition-colors">
              {collection.name}
            </h3>
            {collection.featured && (
              <span className="bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full font-medium">
                Destacado
              </span>
            )}
          </div>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
              {collection.description}
            </p>
          )}
          
          <Button 
            variant="outline" 
            className="w-full text-foreground border-primary/20 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 group/btn"
            onClick={() => onViewProducts(collection.id)}
          >
            <span>Ver Productos</span>
            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
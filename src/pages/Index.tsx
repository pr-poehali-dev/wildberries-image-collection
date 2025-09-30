import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';

type Category = 'all' | 'casual' | 'business' | 'спорт' | 'вечерний';

interface Outfit {
  id: number;
  title: string;
  category: Category;
  image: string;
  price: string;
  tags: string[];
}

const outfits: Outfit[] = [
  {
    id: 1,
    title: 'Casual Chic',
    category: 'casual',
    image: '/img/edb625cf-d428-4073-864c-850a7853fb71.jpg',
    price: '4 500 ₽',
    tags: ['повседневный', 'комфорт', 'стиль']
  },
  {
    id: 2,
    title: 'Business Elegance',
    category: 'business',
    image: '/img/b9d14ed2-fbd8-4716-b7d4-6c894567ec83.jpg',
    price: '8 900 ₽',
    tags: ['деловой', 'классика', 'офис']
  },
  {
    id: 3,
    title: 'Active Sport',
    category: 'спорт',
    image: '/img/39919b50-545b-47e0-b94d-ffa29f1ff40a.jpg',
    price: '3 200 ₽',
    tags: ['спортивный', 'активный', 'комфорт']
  },
  {
    id: 4,
    title: 'Evening Style',
    category: 'вечерний',
    image: '/img/edb625cf-d428-4073-864c-850a7853fb71.jpg',
    price: '12 500 ₽',
    tags: ['вечерний', 'элегантный', 'праздник']
  },
  {
    id: 5,
    title: 'Urban Casual',
    category: 'casual',
    image: '/img/b9d14ed2-fbd8-4716-b7d4-6c894567ec83.jpg',
    price: '5 200 ₽',
    tags: ['городской', 'стильный', 'молодежный']
  },
  {
    id: 6,
    title: 'Smart Business',
    category: 'business',
    image: '/img/39919b50-545b-47e0-b94d-ffa29f1ff40a.jpg',
    price: '9 800 ₽',
    tags: ['деловой', 'современный', 'уверенность']
  }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const categories: { value: Category; label: string; icon: string }[] = [
    { value: 'all', label: 'Все образы', icon: 'LayoutGrid' },
    { value: 'casual', label: 'Casual', icon: 'Shirt' },
    { value: 'business', label: 'Business', icon: 'Briefcase' },
    { value: 'спорт', label: 'Спорт', icon: 'Dumbbell' },
    { value: 'вечерний', label: 'Вечерний', icon: 'Sparkles' }
  ];

  const toggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const filteredOutfits = useMemo(() => {
    return outfits.filter(outfit => {
      const matchesCategory = selectedCategory === 'all' || outfit.category === selectedCategory;
      const matchesSearch = outfit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        outfit.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Wildberries</h1>
            <div className="flex items-center gap-6">
              <button className="text-sm hover:text-primary transition-colors">Новинки</button>
              <button className="text-sm hover:text-primary transition-colors">Коллекции</button>
              <button className="text-sm hover:text-primary transition-colors">Sale</button>
              <button className="text-sm hover:text-primary transition-colors">О нас</button>
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setSelectedCategory('all')}
              >
                <Icon name="Heart" size={20} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <section className="py-16 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-4 animate-fade-in">Outfit Collection</h2>
          <p className="text-lg text-muted-foreground mb-8 animate-fade-in">
            Сборник стильных образов для любого случая
          </p>
          <div className="max-w-2xl mx-auto relative animate-scale-in">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Поиск образов..."
              className="pl-12 h-12 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </section>

      <section className="py-8 border-y border-border bg-background sticky top-[73px] z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {categories.map((cat) => (
              <Button
                key={cat.value}
                variant={selectedCategory === cat.value ? 'default' : 'outline'}
                className="gap-2 transition-all hover:scale-105"
                onClick={() => setSelectedCategory(cat.value)}
              >
                <Icon name={cat.icon} size={18} />
                {cat.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOutfits.map((outfit, index) => (
            <Card
              key={outfit.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-300 animate-fade-in border-2 hover:border-primary/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden aspect-[3/4] bg-secondary">
                <img
                  src={outfit.image}
                  alt={outfit.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button
                  onClick={() => toggleFavorite(outfit.id)}
                  className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110"
                >
                  <Icon
                    name="Heart"
                    size={20}
                    className={favorites.includes(outfit.id) ? 'fill-primary text-primary' : 'text-foreground'}
                  />
                </button>
              </div>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-semibold">{outfit.title}</h3>
                  <Badge variant="outline" className="text-primary border-primary">
                    {outfit.category}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {outfit.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{outfit.price}</span>
                  <Button className="gap-2 hover:gap-3 transition-all">
                    Shop Now
                    <Icon name="ArrowRight" size={16} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOutfits.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить фильтры или поисковый запрос</p>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              © 2024 Wildberries Outfit Collection
            </p>
            <div className="flex gap-4">
              <Icon name="Instagram" size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Icon name="Youtube" size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              <Icon name="Facebook" size={20} className="text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
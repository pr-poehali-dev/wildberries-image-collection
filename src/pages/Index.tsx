import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Card, CardContent } from '@/components/ui/card';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';

type Category = 'all' | 'casual' | 'business' | 'спорт' | 'вечерний';

interface Outfit {
  id: number;
  title: string;
  category: Category;
  image: string;
  price: string;
  tags: string[];
  description: string;
}

const outfits: Outfit[] = [
  {
    id: 1,
    title: 'Casual Chic',
    category: 'casual',
    image: '/img/d7ede3dc-b294-4878-a85f-79b92c55a35c.jpg',
    price: '4 500 ₽',
    tags: ['повседневный', 'комфорт', 'стиль'],
    description: 'Идеальный образ для прогулок по городу'
  },
  {
    id: 2,
    title: 'Business Elegance',
    category: 'business',
    image: '/img/b9d14ed2-fbd8-4716-b7d4-6c894567ec83.jpg',
    price: '8 900 ₽',
    tags: ['деловой', 'классика', 'офис'],
    description: 'Элегантный деловой стиль для важных встреч'
  },
  {
    id: 3,
    title: 'Active Sport',
    category: 'спорт',
    image: '/img/39919b50-545b-47e0-b94d-ffa29f1ff40a.jpg',
    price: '3 200 ₽',
    tags: ['спортивный', 'активный', 'комфорт'],
    description: 'Комфортный образ для активного образа жизни'
  },
  {
    id: 4,
    title: 'Evening Glamour',
    category: 'вечерний',
    image: '/img/914ce3fd-f576-45b6-b8ed-18b5c9e94ad1.jpg',
    price: '12 500 ₽',
    tags: ['вечерний', 'элегантный', 'праздник'],
    description: 'Роскошный вечерний образ для особых случаев'
  },
  {
    id: 5,
    title: 'Urban Casual',
    category: 'casual',
    image: '/img/edb625cf-d428-4073-864c-850a7853fb71.jpg',
    price: '5 200 ₽',
    tags: ['городской', 'стильный', 'молодежный'],
    description: 'Модный городской стиль для молодых и активных'
  },
  {
    id: 6,
    title: 'Smart Business',
    category: 'business',
    image: '/img/d7ede3dc-b294-4878-a85f-79b92c55a35c.jpg',
    price: '9 800 ₽',
    tags: ['деловой', 'современный', 'уверенность'],
    description: 'Современный деловой образ с акцентом на стиль'
  },
  {
    id: 7,
    title: 'Fitness Pro',
    category: 'спорт',
    image: '/img/39919b50-545b-47e0-b94d-ffa29f1ff40a.jpg',
    price: '4 100 ₽',
    tags: ['фитнес', 'тренировки', 'активный'],
    description: 'Профессиональная спортивная одежда для тренировок'
  },
  {
    id: 8,
    title: 'Cocktail Night',
    category: 'вечерний',
    image: '/img/914ce3fd-f576-45b6-b8ed-18b5c9e94ad1.jpg',
    price: '11 200 ₽',
    tags: ['коктейльный', 'вечеринка', 'элегантность'],
    description: 'Изысканный образ для вечерних коктейлей'
  }
];

export default function Index() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
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
      <header className="border-b border-border bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-5">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                Wildberries
              </h1>
              <div className="hidden md:flex items-center gap-6">
                <button className="text-sm font-medium hover:text-primary transition-colors">Новинки</button>
                <button className="text-sm font-medium hover:text-primary transition-colors">Коллекции</button>
                <button className="text-sm font-medium hover:text-primary transition-colors">Sale</button>
                <button className="text-sm font-medium hover:text-primary transition-colors">О нас</button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-primary/10"
              >
                <Icon name="Heart" size={22} />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {favorites.length}
                  </span>
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Icon name="SlidersHorizontal" size={22} />
              </Button>
            </div>
          </nav>
        </div>
      </header>

      <section className="relative bg-gradient-to-br from-primary/5 via-purple-50 to-background py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 text-sm py-2 px-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              Новая коллекция 2024
            </Badge>
            <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Сборник
              <br />
              <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
                стильных образов
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Откройте для себя тщательно подобранные образы для любого случая — от повседневных до вечерних
            </p>
            <div className="max-w-2xl mx-auto relative">
              <Icon name="Search" size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Найти идеальный образ..."
                className="pl-14 h-14 text-lg rounded-full border-2 shadow-lg focus:shadow-xl transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white border-y border-border sticky top-[77px] z-40 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 md:pb-0 flex-1">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  className="gap-2 transition-all hover:scale-105 whitespace-nowrap rounded-full"
                  onClick={() => setSelectedCategory(cat.value)}
                >
                  <Icon name={cat.icon} size={18} />
                  {cat.label}
                  {selectedCategory === cat.value && (
                    <Badge variant="secondary" className="ml-1 bg-primary-foreground text-primary">
                      {filteredOutfits.length}
                    </Badge>
                  )}
                </Button>
              ))}
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 ml-4 hidden md:flex rounded-full">
                  <Icon name="SlidersHorizontal" size={18} />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Категории</h3>
                    <div className="space-y-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => setSelectedCategory(cat.value)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                            selectedCategory === cat.value
                              ? 'bg-primary text-primary-foreground'
                              : 'hover:bg-secondary'
                          }`}
                        >
                          <Icon name={cat.icon} size={18} />
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-semibold mb-3">Избранное</h3>
                    <p className="text-sm text-muted-foreground">
                      {favorites.length > 0
                        ? `Сохранено образов: ${favorites.length}`
                        : 'Пока нет избранных образов'}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredOutfits.map((outfit, index) => (
            <Card
              key={outfit.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 animate-fade-in border-0 bg-white rounded-2xl"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="relative overflow-hidden aspect-[3/4] bg-gradient-to-br from-secondary to-secondary/50">
                <img
                  src={outfit.image}
                  alt={outfit.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <button
                  onClick={() => toggleFavorite(outfit.id)}
                  className="absolute top-4 right-4 w-11 h-11 bg-white/95 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110 shadow-lg"
                >
                  <Icon
                    name="Heart"
                    size={20}
                    className={favorites.includes(outfit.id) ? 'fill-primary text-primary' : 'text-foreground'}
                  />
                </button>
                <Badge className="absolute top-4 left-4 bg-white/95 text-foreground border-0 shadow-lg">
                  {outfit.category}
                </Badge>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-sm font-medium">{outfit.description}</p>
                </div>
              </div>
              <CardContent className="p-5">
                <div className="mb-3">
                  <h3 className="text-lg font-bold mb-1">{outfit.title}</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {outfit.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    {outfit.price}
                  </span>
                  <Button size="sm" className="gap-2 hover:gap-3 transition-all rounded-full shadow-md">
                    Смотреть
                    <Icon name="ArrowRight" size={14} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredOutfits.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Search" size={40} className="text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground text-lg mb-6">
              Попробуйте изменить фильтры или поисковый запрос
            </p>
            <Button onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }} variant="outline" className="rounded-full">
              Сбросить фильтры
            </Button>
          </div>
        )}
      </main>

      <section className="bg-gradient-to-br from-primary/10 via-purple-50 to-background py-20 border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4">Подборки сезона</h3>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Специально подобранные образы от наших стилистов для этого сезона
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center">
                <Icon name="Sparkles" size={48} className="text-primary" />
              </div>
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-2">Весенняя свежесть</h4>
                <p className="text-sm text-muted-foreground">12 образов</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                <Icon name="Briefcase" size={48} className="text-primary" />
              </div>
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-2">Деловой стиль</h4>
                <p className="text-sm text-muted-foreground">8 образов</p>
              </CardContent>
            </Card>
            <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all">
              <div className="aspect-square bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                <Icon name="Flame" size={48} className="text-primary" />
              </div>
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-2">Горячие тренды</h4>
                <p className="text-sm text-muted-foreground">15 образов</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-4">
                Wildberries
              </h1>
              <p className="text-sm text-muted-foreground">
                Ваш источник вдохновения для создания идеального образа
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Помощь</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Доставка</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Соцсети</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                  <Icon name="Instagram" size={18} />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                  <Icon name="Youtube" size={18} />
                </Button>
                <Button size="icon" variant="outline" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-all">
                  <Icon name="Facebook" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <Separator className="mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 Wildberries Outfit Collection. Все права защищены.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-primary transition-colors">Конфиденциальность</a>
              <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
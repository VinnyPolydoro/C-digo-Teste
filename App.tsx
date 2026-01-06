
import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  BrainCircuit, 
  Dumbbell, 
  AlertTriangle, 
  Zap, 
  ArrowRight,
  Target,
  UserCheck,
  Timer,
  Info
} from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// UI Components
// Fix: Made children optional to resolve TS error where children passed in JSX are not correctly recognized
const Button = ({ children, onClick, className = "", variant = "primary" }: { 
  children?: React.ReactNode, 
  onClick?: () => void, 
  className?: string, 
  variant?: "primary" | "secondary" | "outline" 
}) => {
  const baseStyles = "px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 text-lg shadow-lg";
  const variants = {
    primary: "bg-gradient-to-r from-sky-500 to-indigo-600 text-white hover:from-sky-400 hover:to-indigo-500 shadow-sky-500/20",
    secondary: "bg-white text-slate-900 hover:bg-slate-100 shadow-white/10",
    outline: "border-2 border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-500"
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// Fix: Made children optional to resolve TS error where children passed in JSX are not correctly recognized
const Section = ({ children, className = "", id = "" }: { children?: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`py-20 px-6 md:px-12 max-w-7xl mx-auto ${className}`}>
    {children}
  </section>
);

// Fix: Made children optional to resolve TS error where children passed in JSX are not correctly recognized
const Card = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`p-8 rounded-3xl bg-glass ${className}`}>
    {children}
  </div>
);

// AI Integration Component
const AIHabitAnalyzer = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const analyzeHabit = async () => {
    if (!input) return;
    setLoading(true);
    try {
      // Fix: Follow strictly the initialization guideline (must not use fallback empty string)
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `Atue como um especialista em neurociência de hábitos. O usuário diz: "${input}". 
      Explique brevemente por que ele está falhando usando o conceito dos 66 dias (University College London) 
      e dê uma palavra de encorajamento rápida focada no Método 66 Dias. Seja direto, sofisticado e motivador. Máximo 100 palavras.`;
      
      // Fix: Follow strictly the GenerateContentResponse usage
      const res: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      // Fix: response.text is a property, not a method.
      setResponse(res.text || "Ocorreu um erro ao processar. Tente novamente.");
    } catch (error) {
      console.error(error);
      setResponse("A ciência explica que o reinício constante é fruto de um método falho. No Método 66 Dias, resolvemos isso.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 max-w-2xl mx-auto">
      <Card className="border-sky-500/30 border">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <BrainCircuit className="text-sky-400" />
          Diagnóstico Neurocientífico Grátis
        </h3>
        <p className="text-slate-400 mb-6 text-sm">
          Conte-nos: Por que você costuma desistir da academia? Nossa IA analisará sua resposta com base na ciência dos hábitos.
        </p>
        <div className="flex flex-col gap-4">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ex: Eu começo bem mas perco a vontade na segunda semana..."
            className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 focus:ring-2 focus:ring-sky-500 outline-none h-24 resize-none"
          />
          <button 
            onClick={analyzeHabit}
            disabled={loading || !input}
            className="bg-sky-500/10 border border-sky-500/50 text-sky-400 py-3 rounded-xl font-semibold hover:bg-sky-500 hover:text-white transition-all disabled:opacity-50"
          >
            {loading ? "Analisando seu cérebro..." : "Analisar meu Caso"}
          </button>
        </div>
        {response && (
          <div className="mt-6 p-4 bg-slate-800/50 rounded-xl text-slate-300 italic text-sm leading-relaxed border-l-4 border-sky-500">
            {response}
          </div>
        )}
      </Card>
    </div>
  );
};

const App: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins countdown

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const scrollToOffer = () => {
    document.getElementById('oferta')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Sticky Banner */}
      <div className="bg-sky-600 text-white text-center py-2 text-sm font-bold sticky top-0 z-50">
        OFERTA LIMITADA: Desconto de 75% expira em {formatTime(timeLeft)}
      </div>

      {/* Hero Section */}
      <Section className="text-center pt-32 pb-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 mb-8 font-semibold animate-pulse">
          <Zap size={18} />
          A Ciência Finalmente Revelou o Segredo
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
          Pare de Começar e Recomeçar. <br />
          <span className="gradient-text">Consistência em 66 Dias.</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-10 leading-relaxed">
          Você não precisa de mais motivação. Você precisa de um <span className="text-white font-bold italic underline decoration-sky-500">método científico</span> para transformar o treino em um hábito tão automático quanto escovar os dentes.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Button onClick={scrollToOffer} variant="primary">
            Quero Minha Consistência Inquebrável <ArrowRight size={20} />
          </Button>
          <p className="text-slate-500 text-sm flex items-center gap-1">
            <ShieldCheck size={16} /> Acesso imediato e seguro
          </p>
        </div>
      </Section>

      {/* Pain Points */}
      <Section className="bg-slate-900/50 rounded-[4rem]">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">A Dor que Você Conhece Bem...</h2>
            <div className="space-y-6 text-slate-400 text-lg">
              <p className="flex gap-4">
                <AlertTriangle className="text-red-500 shrink-0" />
                <span>Frustrado por pagar a mensalidade e só ir nas primeiras semanas?</span>
              </p>
              <p className="flex gap-4">
                <AlertTriangle className="text-red-500 shrink-0" />
                <span>Culpado por ter que "recomeçar" toda segunda-feira, mas a motivação some na quarta?</span>
              </p>
              <p className="text-slate-300 font-medium">
                A verdade é que você não é preguiçoso. Você foi enganado por um mito: o mito de que 21 dias são suficientes para criar um hábito.
              </p>
              <p>
                Se você já tentou alarmes, parceiros de treino e listas, e nada funcionou... O problema não é você. <strong>É o método.</strong>
              </p>
            </div>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800" 
              alt="Frustrated Fitness" 
              className="rounded-3xl shadow-2xl border-4 border-slate-800 rotate-2 hover:rotate-0 transition-transform duration-500"
            />
            <div className="absolute -bottom-6 -left-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl max-w-xs">
              <p className="text-sm font-bold text-sky-400 mb-1 italic">"Sempre a mesma história?"</p>
              <p className="text-xs text-slate-500">Milhares de pessoas desistem no 25º dia sem saber que estavam a dias de se tornarem imparáveis.</p>
            </div>
          </div>
        </div>
      </Section>

      {/* The Science */}
      <Section className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-12">O Mito dos 21 Dias <br /><span className="text-sky-500 underline">vs</span> A Verdade Científica</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-red-500/20 border opacity-50">
            <div className="text-red-500 mb-4 flex justify-center"><AlertTriangle size={48} /></div>
            <h3 className="text-xl font-bold mb-2">21 Dias (MITO)</h3>
            <p className="text-slate-400">Baseado em uma observação superficial de 1950. Incompleto e leva à desistência precoce.</p>
          </Card>
          
          <Card className="border-sky-500/50 border scale-105 relative bg-sky-950/20">
             <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Comprovado</div>
            <div className="text-sky-500 mb-4 flex justify-center"><CheckCircle2 size={48} /></div>
            <h3 className="text-xl font-bold mb-2">66 Dias (CIÊNCIA)</h3>
            <p className="text-slate-400">Estudo da University College London. O tempo médio real para a <strong>automação cognitiva</strong> de um hábito complexo como o exercício.</p>
          </Card>

          <Card className="border-slate-800 border">
            <div className="text-slate-500 mb-4 flex justify-center"><BrainCircuit size={48} /></div>
            <h3 className="text-xl font-bold mb-2">Resultado Final</h3>
            <p className="text-slate-400">Ao cruzar a linha dos 66 dias, seu cérebro deixa de gastar energia decidindo ir. Você simplesmente vai.</p>
          </Card>
        </div>

        <AIHabitAnalyzer />
      </Section>

      {/* The Phases */}
      <Section className="bg-slate-900/30 rounded-[4rem]">
        <h2 className="text-4xl font-bold text-center mb-16">O Método: Seu Mapa de 66 Dias</h2>
        
        <div className="space-y-12">
          {/* Phase 1 */}
          <div className="flex flex-col md:flex-row gap-8 items-center group">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-sky-500 flex items-center justify-center text-3xl font-bold text-sky-500 shrink-0 group-hover:scale-110 transition-transform">1</div>
            <Card className="flex-1 w-full border-l-4 border-sky-500">
              <h3 className="text-2xl font-bold mb-2">Fase de Iniciação (Dia 1 ao 22)</h3>
              <p className="text-slate-400 mb-4">Vencendo a Inércia. Aprenda a implementar "micro-hábitos" que tornam a ida à academia impossível de ignorar, sem depender de 1% de motivação.</p>
              <div className="flex gap-2 text-xs font-bold text-sky-400 uppercase">
                <span className="bg-sky-500/10 px-2 py-1 rounded">Micro-Ações</span>
                <span className="bg-sky-500/10 px-2 py-1 rounded">Psicologia de Gatilho</span>
              </div>
            </Card>
          </div>

          {/* Phase 2 */}
          <div className="flex flex-col md:flex-row gap-8 items-center group">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-indigo-500 flex items-center justify-center text-3xl font-bold text-indigo-500 shrink-0 group-hover:scale-110 transition-transform">2</div>
            <Card className="flex-1 w-full border-l-4 border-indigo-500">
              <h3 className="text-2xl font-bold mb-2">Fase de Integração (Dia 23 ao 44)</h3>
              <p className="text-slate-400 mb-4">Blindando a Rotina. Descubra como gerenciar imprevistos, viagens e o temido "dia da preguiça" sem quebrar sua corrente de consistência.</p>
              <div className="flex gap-2 text-xs font-bold text-indigo-400 uppercase">
                <span className="bg-indigo-500/10 px-2 py-1 rounded">Plano B Anti-Desculpa</span>
                <span className="bg-indigo-500/10 px-2 py-1 rounded">Gestão de Fadiga</span>
              </div>
            </Card>
          </div>

          {/* Phase 3 */}
          <div className="flex flex-col md:flex-row gap-8 items-center group">
            <div className="w-24 h-24 rounded-full bg-slate-800 border-2 border-emerald-500 flex items-center justify-center text-3xl font-bold text-emerald-500 shrink-0 group-hover:scale-110 transition-transform">3</div>
            <Card className="flex-1 w-full border-l-4 border-emerald-500">
              <h3 className="text-2xl font-bold mb-2">Fase de Automação (Dia 45 ao 66)</h3>
              <p className="text-slate-400 mb-4">A Mágica da Consistência. Onde o esforço acaba. A academia se torna sua "zona de conforto" e faltar passa a ser mais difícil do que ir.</p>
              <div className="flex gap-2 text-xs font-bold text-emerald-400 uppercase">
                <span className="bg-emerald-500/10 px-2 py-1 rounded">Identidade Fitness</span>
                <span className="bg-emerald-500/10 px-2 py-1 rounded">Hábito Inquebrável</span>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {/* Deliverables */}
      <Section>
        <h2 className="text-4xl font-bold text-center mb-16">O Que Você Recebe Hoje</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:border-sky-500/50 border border-transparent transition-all">
            <Dumbbell className="text-sky-500 mb-4" size={32} />
            <h4 className="font-bold mb-2">Guia Método 66 Dias</h4>
            <p className="text-sm text-slate-400">O mapa detalhado passo a passo para cada fase crítica.</p>
          </Card>
          <Card className="hover:border-sky-500/50 border border-transparent transition-all">
            <CheckCircle2 className="text-sky-500 mb-4" size={32} />
            <h4 className="font-bold mb-2">Checklist Diário</h4>
            <p className="text-sm text-slate-400">Ative seu sistema de recompensa cerebral celebrando cada vitória.</p>
          </Card>
          <Card className="hover:border-sky-500/50 border border-transparent transition-all">
            <Zap className="text-sky-500 mb-4" size={32} />
            <h4 className="font-bold mb-2">Plano B Anti-Desculpa</h4>
            <p className="text-sm text-slate-400">Estratégias para dias sem tempo, lesões leves ou desânimo.</p>
          </Card>
          <Card className="hover:border-sky-500/50 border border-transparent transition-all">
            <UserCheck className="text-sky-500 mb-4" size={32} />
            <h4 className="font-bold mb-2">Fórmula da Identidade</h4>
            <p className="text-sm text-slate-400">Pare de "tentar ir" e torne-se alguém que "simplesmente vai".</p>
          </Card>
        </div>
      </Section>

      {/* Pricing / CTA Section */}
      <Section id="oferta" className="text-center">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-slate-900 to-indigo-950 p-12 rounded-[3rem] border border-sky-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 -rotate-12">
            <Dumbbell size={120} />
          </div>
          
          <h2 className="text-3xl font-bold mb-4">Sua Decisão Sem Riscos</h2>
          <p className="text-slate-400 mb-8">
            Este é um produto low-ticket porque queremos que a saúde seja acessível a todos. Sem desculpas financeiras.
          </p>
          
          <div className="mb-10">
            <p className="text-slate-500 line-through text-lg">De R$ 197,00</p>
            <div className="flex items-center justify-center gap-2">
              <span className="text-5xl font-extrabold text-white">R$ 6,90</span>
              <span className="text-slate-400">à vista</span>
            </div>
            <p className="text-sky-400 font-bold mt-2">Menos que um lanche no final de semana!</p>
          </div>

          <Button className="w-full mb-6" variant="primary">
            QUERO MINHA CONSISTÊNCIA POR R$ 6,90 <ArrowRight size={22} />
          </Button>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <ShieldCheck className="text-emerald-500" /> 7 dias de garantia total
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <CheckCircle2 className="text-emerald-500" /> Acesso vitalício
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Zap className="text-emerald-500" /> Entrega imediata via E-mail
            </div>
          </div>
        </div>
      </Section>

      {/* Guarantee Section */}
      <Section className="text-center pt-0">
        <div className="flex flex-col items-center max-w-2xl mx-auto">
          <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
             <ShieldCheck size={60} className="text-sky-500" />
          </div>
          <h3 className="text-2xl font-bold mb-4 italic">"Eu assumo todo o risco"</h3>
          <p className="text-slate-400">
            Se em 7 dias você aplicar as estratégias iniciais e não sentir que está no caminho certo para transformar a academia em um hábito, basta nos enviar um e-mail. <strong>Devolvemos 100% do seu dinheiro</strong>, sem perguntas e sem letras miúdas.
          </p>
        </div>
      </Section>

      {/* FAQ Simple */}
      <Section className="border-t border-slate-900">
        <h2 className="text-3xl font-bold text-center mb-12">Perguntas Frequentes</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h4 className="font-bold text-sky-400 mb-2">Preciso de algum equipamento?</h4>
            <p className="text-sm text-slate-400">Não. O método é mental e comportamental. Você aplica em qualquer academia, box de crossfit ou até treinos em casa.</p>
          </div>
          <div>
            <h4 className="font-bold text-sky-400 mb-2">Já tentei de tudo, isso funciona pra mim?</h4>
            <p className="text-sm text-slate-400">Sim. O segredo está nos 66 dias e no sistema de fases. Se você falhou antes, é porque estava tentando um método que ia contra a sua biologia.</p>
          </div>
          <div>
            <h4 className="font-bold text-sky-400 mb-2">Como recebo o acesso?</h4>
            <p className="text-sm text-slate-400">Imediatamente após a confirmação do pagamento, você recebe os links de download direto no seu e-mail cadastrado.</p>
          </div>
          <div>
            <h4 className="font-bold text-sky-400 mb-2">O pagamento é seguro?</h4>
            <p className="text-sm text-slate-400">100% seguro. Utilizamos criptografia de ponta e as maiores processadoras de pagamento do Brasil.</p>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 text-center text-slate-600 text-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-center gap-6 mb-8">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Termos de Uso</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacidade</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Suporte</span>
          </div>
          <p className="mb-4">© 2024 Método 66 Dias - Consistência Inquebrável. Todos os direitos reservados.</p>
          <p className="max-w-2xl mx-auto opacity-50">
            Este produto não substitui o aconselhamento profissional de um médico ou educador físico. Os resultados podem variar de pessoa para pessoa dependendo da aplicação fiel do método.
          </p>
        </div>
      </footer>

      {/* CTA Mobile Sticky (Optional but recommended) */}
      <div className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <button 
          onClick={scrollToOffer}
          className="w-full bg-sky-500 text-white font-bold py-4 rounded-xl shadow-2xl flex items-center justify-center gap-2"
        >
          QUERO COMEÇAR AGORA <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default App;

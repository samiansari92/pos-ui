"use client";
import { PageContainer } from "@/components/layout/page-container";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, ThumbsDown, TrendingUp, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { getInitials, formatDate, cn } from "@/lib/utils";

const feedbackData = [
  { id: "f1", customer: "Rahul Sharma", rating: 5, category: "Food", comment: "Absolutely loved the Chicken Biryani! The flavors were spot on and the portion size was generous. Will definitely order again.", date: "2026-06-18", table: "T3", response: null, sentiment: "positive" },
  { id: "f2", customer: "Priya Patel", rating: 4, category: "Service", comment: "Great food and ambiance. Service was a bit slow during peak hours but staff was very friendly and accommodating.", date: "2026-06-17", table: "T7", response: "Thank you Priya! We're working on improving our peak-hour service. Hope to see you again soon!", sentiment: "positive" },
  { id: "f3", customer: "Anonymous", rating: 2, category: "Food", comment: "The Palak Paneer was too salty and arrived cold. Expected better quality for the price.", date: "2026-06-17", table: "T2", response: null, sentiment: "negative" },
  { id: "f4", customer: "Arun Kumar", rating: 5, category: "Ambiance", comment: "Wonderful dining experience. The new terrace seating area is beautiful. Great for family gatherings.", date: "2026-06-16", table: "T9", response: "Thank you for the kind words, Arun! The terrace is our newest addition!", sentiment: "positive" },
  { id: "f5", customer: "Sneha Reddy", rating: 3, category: "Delivery", comment: "Order arrived 30 minutes late and packaging was not great. Food was good though.", date: "2026-06-15", table: null, response: null, sentiment: "neutral" },
  { id: "f6", customer: "Karthik Nair", rating: 5, category: "Food", comment: "Paneer Tikka was absolutely divine! The marinade was perfect and the tandoor charring was just right.", date: "2026-06-14", table: "T5", response: null, sentiment: "positive" },
];

const ratingDist = [5, 4, 3, 2, 1].map(r => ({
  rating: r,
  count: feedbackData.filter(f => f.rating === r).length,
  percent: Math.round((feedbackData.filter(f => f.rating === r).length / feedbackData.length) * 100),
}));

const avgRating = (feedbackData.reduce((s, f) => s + f.rating, 0) / feedbackData.length).toFixed(1);

export default function FeedbackPage() {
  const [filter, setFilter] = useState("all");
  const [replyText, setReplyText] = useState({});

  const filtered = filter === "all"
    ? feedbackData
    : feedbackData.filter(f => f.sentiment === filter || (filter === "unanswered" && !f.response));

  return (
    <PageContainer>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold">Customer Feedback</h1>
          <p className="text-xs text-muted-foreground mt-0.5">{feedbackData.length} reviews collected</p>
        </div>
        <Button variant="outline" size="sm" className="gap-1.5">
          <Filter className="h-3.5 w-3.5" />Export
        </Button>
      </div>

      {/* Rating Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-xl border bg-card p-5 flex flex-col items-center justify-center">
          <p className="text-5xl font-black text-foreground">{avgRating}</p>
          <div className="flex items-center gap-0.5 mt-2">
            {[1,2,3,4,5].map(s => (
              <Star key={s} className={cn("h-5 w-5", s <= Math.round(Number(avgRating)) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30")} />
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Average Rating</p>
          <p className="text-xs text-muted-foreground">{feedbackData.length} reviews</p>
        </div>

        <div className="rounded-xl border bg-card p-5 col-span-2">
          <p className="text-sm font-semibold mb-3">Rating Distribution</p>
          <div className="space-y-2">
            {ratingDist.map(r => (
              <div key={r.rating} className="flex items-center gap-3">
                <div className="flex items-center gap-1 w-12 shrink-0">
                  <span className="text-xs font-medium">{r.rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <Progress value={r.percent} className="h-2 flex-1" indicatorClassName={r.rating >= 4 ? "bg-green-500" : r.rating === 3 ? "bg-amber-500" : "bg-red-500"} />
                <span className="text-xs text-muted-foreground w-8 text-right">{r.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sentiment KPIs */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Positive", value: feedbackData.filter(f => f.sentiment === "positive").length, icon: ThumbsUp, color: "text-green-600", bg: "bg-green-50 dark:bg-green-950/20" },
          { label: "Neutral", value: feedbackData.filter(f => f.sentiment === "neutral").length, icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-950/20" },
          { label: "Negative", value: feedbackData.filter(f => f.sentiment === "negative").length, icon: ThumbsDown, color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/20" },
        ].map((item, i) => (
          <div key={item.label} className="rounded-xl border bg-card p-4 flex items-center gap-3">
            <div className={cn("h-9 w-9 rounded-xl flex items-center justify-center", item.bg)}>
              <item.icon className={cn("h-4 w-4", item.color)} />
            </div>
            <div>
              <p className="text-xl font-bold">{item.value}</p>
              <p className="text-xs text-muted-foreground">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1.5">
        {["all", "positive", "neutral", "negative", "unanswered"].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize", filter === f ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
            {f === "unanswered" ? "Needs Reply" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      {/* Feedback list */}
      <div className="space-y-3">
        {filtered.map((fb, i) => (
          <motion.div key={fb.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-xl border bg-card p-4">
            <div className="flex items-start gap-3">
              <Avatar className="h-9 w-9 shrink-0">
                <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                  {fb.customer === "Anonymous" ? "?" : getInitials(fb.customer)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-sm font-semibold">{fb.customer}</p>
                  <div className="flex items-center gap-0.5">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={cn("h-3.5 w-3.5", s <= fb.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/20")} />
                    ))}
                  </div>
                  <Badge variant={fb.category === "Food" ? "info" : fb.category === "Service" ? "success" : fb.category === "Delivery" ? "purple" : "secondary"} className="text-[10px]">
                    {fb.category}
                  </Badge>
                  {fb.table && <Badge variant="outline" className="text-[10px]">Table {fb.table}</Badge>}
                  <span className="text-xs text-muted-foreground ml-auto">{formatDate(fb.date)}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{fb.comment}</p>

                {fb.response && (
                  <div className="mt-3 ml-3 pl-3 border-l-2 border-primary/30">
                    <p className="text-[11px] font-semibold text-primary mb-1">Restaurant Response</p>
                    <p className="text-xs text-muted-foreground">{fb.response}</p>
                  </div>
                )}

                {!fb.response && (
                  <div className="mt-3 flex items-center gap-2">
                    <input
                      placeholder="Write a reply..."
                      value={replyText[fb.id] || ""}
                      onChange={e => setReplyText(prev => ({ ...prev, [fb.id]: e.target.value }))}
                      className="flex-1 h-8 rounded-lg border border-input bg-background px-3 text-xs focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                    <Button size="sm" className="h-8 text-xs shrink-0">Reply</Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
}
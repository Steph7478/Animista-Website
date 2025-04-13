import { useState, useCallback, useRef } from "react";
import { emojiData } from "../../data/Emojis";

const useEmojiPicker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [inputText, setInputText] = useState("");
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const emojiContainerRef = useRef<HTMLDivElement>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const [recentlyUsed, setRecentlyUsed] = useState<string[]>([]);
  const MAX_RECENTLY_USED = 10;

  const handleEmojiClick = useCallback((emoji: string) => {
    setInputText((prevText) => prevText + emoji);
    setIsPickerOpen(false);

    setRecentlyUsed((prev) => {
      const updated = [emoji, ...prev.filter((e) => e !== emoji)];
      return updated.slice(0, MAX_RECENTLY_USED);
    });
  }, []);

  const scrollToCategory = (categoryKey: string) => {
    const categoryElement = document.querySelector(
      `[data-category="${categoryKey}"]`,
    );
    if (categoryElement && categoryElement instanceof HTMLElement) {
      emojiContainerRef.current?.scrollTo({
        top: categoryElement.offsetTop,
        behavior: "smooth",
      });
    }
  };

  const filteredEmojiData = Object.entries(emojiData).reduce(
    (acc, [category, { emojis, emojiIcon }]) => {
      const filteredEmojis = emojis.filter(
        (emojiData) =>
          emojiData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          emojiData.emoji.includes(searchTerm),
      );
      if (filteredEmojis.length > 0 || searchTerm === "") {
        acc[category] = { emojiIcon, emojis: filteredEmojis };
      }
      return acc;
    },
    {} as Record<
      string,
      { emojiIcon: string; emojis: { emoji: string; name: string }[] }
    >,
  );

  const emojiPickerJSX = (
    <div
      ref={emojiContainerRef}
      className="picker h-[250px] w-[250px] overflow-auto rounded-lg bg-white p-4 shadow-lg shadow-gray-300 transition-transform duration-150 ease-in-out"
    >
      <div className="font-semibold">
        <div className="flex">
          <button
            onClick={() => {
              scrollToCategory("Recently Used");
            }}
            className="text-xl"
          >
            🕒
          </button>

          {Object.entries(filteredEmojiData).map(
            ([category, { emojiIcon }]) => (
              <div
                className="w-full self-center justify-self-center"
                key={category}
              >
                <button
                  onClick={() => {
                    scrollToCategory(category);
                  }}
                  className="text-xl"
                >
                  {emojiIcon}
                </button>
              </div>
            ),
          )}
        </div>

        <input
          type="text"
          className="my-4 w-full rounded-full border-[1px] border-gray-300 px-4 py-2"
          placeholder="Suchen"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div
        ref={emojiRef}
        className="flex flex-col gap-y-2 overflow-y-auto font-semibold"
      >
        {recentlyUsed.length > 0 && (
          <>
            <span> Häufig verwendet </span>
            <div className="flex flex-row flex-wrap">
              {recentlyUsed.map((emoji: string, idx: number) => (
                <div key={"Recently Used"} data-category={"Recently Used"}>
                  <button
                    key={idx}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-xl"
                  >
                    {emoji}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {Object.entries(filteredEmojiData).map(([category, { emojis }]) => (
          <div
            key={category}
            data-category={category}
            className="flex flex-col gap-y-3"
          >
            <span>{category}</span>
            <div className="flex flex-wrap">
              {emojis.map((emojiData, idx) => (
                <button
                  key={idx}
                  onClick={() => handleEmojiClick(emojiData.emoji)}
                  className="text-xl"
                >
                  {emojiData.emoji}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return {
    inputText,
    setInputText,
    isPickerOpen,
    setIsPickerOpen,
    emojiPickerJSX,
  };
};

export default useEmojiPicker;

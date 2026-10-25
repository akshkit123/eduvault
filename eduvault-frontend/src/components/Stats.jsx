const stats = [
  {
    value: "10k+",
    label: "ACTIVE STUDENTS",
  },
  {
    value: "50k+",
    label: "CERTIFICATES STORED",
  },
  {
    value: "500+",
    label: "RECRUITERS",
  },
  {
    value: "2k+",
    label: "ALUMNI NETWORK",
  },
];

function Stats() {
  return (
    <section className="w-full bg-[#eef1ff]">
      <div className="grid min-h-[180px] w-full grid-cols-2 lg:grid-cols-4">

        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col items-center justify-center px-4 ${
              index !== 0
                ? "border-l border-[#dfe3f5]"
                : ""
            }`}
          >
            <p className="text-[14px] font-medium tracking-wide text-[#4b35e8]">
              {stat.value}
            </p>

            <p className="mt-2 text-[13px] font-medium tracking-[0.14em] text-[#55586b]">
              {stat.label}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}

export default Stats;